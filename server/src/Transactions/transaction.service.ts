import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { dateStamp } from 'src/utils/dateStamp';
import {
  IncomeOrExpense,
  TransactionInterface,
} from './dataStructureFiles/transaction.interfaces';
import { MongoDBID } from 'src/shared/types';
import { User } from 'src/Auth/dataStructureFiles/auth.interfaces';
import { TransactionDTO } from './dataStructureFiles/transaction.dto';
import { BudgetServices } from 'src/Budgets/budget.service';

@Injectable()
export class TransactionServices {
  constructor(
    @InjectModel('TransactionSchema')
    private readonly transactionModel: Model<TransactionInterface>,
    private budgetServices: BudgetServices
  ) {}

  // ALL TRANSACTION METHODS
  //  The method below creates a new transactions and adds it to the budget within a category
  async addTransaction(
    incomingDTO: TransactionDTO,
    user: User,
    budget_id: MongoDBID,
    category_id: MongoDBID
  ): Promise<TransactionInterface> {
    const newTransaction = new this.transactionModel(incomingDTO);
    newTransaction.type =
      incomingDTO.amount < 0 ? IncomeOrExpense.EXPENSE : IncomeOrExpense.INCOME;
    newTransaction.date_posted = dateStamp();
    newTransaction.last_date_edited = dateStamp();
    newTransaction.user_id = user._id;
    newTransaction.budget_id = budget_id;
    newTransaction.category_id = category_id;
    const foundBudget = await this.budgetServices.getBudgetById(
      user,
      budget_id
    );
    const foundCategory = foundBudget.categories.find(
      (category) => category._id == category_id
    );
    foundCategory.transactions.push({
      title: newTransaction.title,
      amount: incomingDTO.amount,
      type:
        incomingDTO.amount < 0
          ? IncomeOrExpense.EXPENSE
          : IncomeOrExpense.INCOME,
      date_posted: dateStamp(),
      last_date_edited: dateStamp(),
      user_id: user._id,
      budget_id,
      category_id,
      _id: newTransaction._id,
    });
    newTransaction.save();
    foundBudget.save();
    return newTransaction;
  }

  // async getTransaction(
  //   userID: MongoDBID,
  //   transactionID: MongoDBID
  // ): Promise<TransactionInterface> {
  //   const transaction = await this.transactionModel
  //     .findById(transactionID)
  //     .exec();
  //   if (userID == transaction.user_id) {
  //     return transaction;
  //   }
  //   throw new UnauthorizedException('User must own transaction');
  // }

  async getAllTransactions(
    user: User,
    budgetID: MongoDBID
  ): Promise<TransactionInterface[]> {
    const allTransactions = await this.transactionModel.find().exec();
    if (allTransactions) {
      const currentUserTransactions = allTransactions.filter(
        (transaction) =>
          transaction.user_id === user.id && transaction.budget_id === budgetID
      );
      return currentUserTransactions;
    }
    throw new UnauthorizedException('User must own transactions');
  }

  async editTransaction(
    user: User,
    budgetID: MongoDBID,
    currentCategoryID: MongoDBID,
    transactionID: MongoDBID,
    transactionDTO: TransactionDTO
  ): Promise<TransactionInterface> {
    // send the new categoryID with the amount and title
    const editableTransaction = await this.transactionModel.findByIdAndUpdate(
      transactionID,
      transactionDTO,
      {
        new: true,
      }
    );
    editableTransaction.type =
      transactionDTO.amount < 0
        ? IncomeOrExpense.EXPENSE
        : IncomeOrExpense.INCOME;
    editableTransaction.last_date_edited = dateStamp();
    const foundBudget = await this.budgetServices.getBudgetById(user, budgetID);
    const foundCategory = foundBudget.categories.find(
      (category) => category._id == currentCategoryID
    );
    foundCategory.transactions.forEach((transaction) => {
      if (transaction._id.toString() === transactionID) {
        transaction.title = editableTransaction.title;
        transaction.amount = editableTransaction.amount;
        transaction.type = editableTransaction.type;
        transaction.last_date_edited = editableTransaction.last_date_edited;
        transaction.category_id = editableTransaction.category_id;
      }
    });
    foundBudget.save();
    if (editableTransaction === null) {
      throw new NotFoundException('Transaction does not exist!');
    } else if (user._id.toString() === editableTransaction.user_id) {
      return editableTransaction;
    } else if (user._id.toString() !== editableTransaction.user_id) {
      throw new UnauthorizedException('User must own transaction');
    }
  }

  async deleteTransaction(
    user: User,
    budgetID: MongoDBID,
    categoryID: MongoDBID,
    transactionID: MongoDBID
  ): Promise<
    TransactionInterface & {
      _id: MongoDBID;
    }
  > {
    const foundBudget = await this.budgetServices.getBudgetById(user, budgetID);
    const foundCategory = foundBudget.categories.find(
      (category) => category._id == categoryID
    );
    foundCategory.transactions.forEach((transaction) => {
      if (transaction._id.toString() === transactionID) {
        foundCategory.transactions.splice(
          foundCategory.transactions.indexOf(transaction),
          1
        );
      }
    });
    const deletedtransaction = await this.transactionModel.findByIdAndRemove(
      transactionID
    );
    foundBudget.save();
    if (deletedtransaction === null) {
      throw new NotFoundException('Transaction was already deleted.');
    } else if (user._id.toString() === deletedtransaction.user_id) {
      return deletedtransaction;
    }
    throw new UnauthorizedException('User must own transaction');
  }
}
