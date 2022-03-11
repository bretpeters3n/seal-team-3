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

@Injectable()
export class TransactionServices {
  constructor(
    @InjectModel('IncomeSchema')
    private readonly incomeModel: Model<TransactionInterface>,
    @InjectModel('ExpenseSchema')
    private readonly expenseModel: Model<TransactionInterface>
  ) {}

  // ALL TRANSACTION METHODS
  async addTransaction(
    incomingDTO: TransactionDTO,
    user: User,
    transactionType: string
  ): Promise<TransactionInterface> {
    const newTransaction =
      transactionType === 'income'
        ? new this.incomeModel(incomingDTO)
        : new this.expenseModel(incomingDTO);
    newTransaction.type =
      transactionType === 'income'
        ? IncomeOrExpense.INCOME
        : IncomeOrExpense.EXPENSE;
    newTransaction.date_posted = dateStamp();
    newTransaction.last_date_edited = dateStamp();
    newTransaction.user_id = user._id;
    return newTransaction.save();
  }

  // async getTransaction(
  //   userID: MongoDBID,
  //   transactionID: MongoDBID,
  //   transactionType: IncomeOrExpense
  // ): Promise<TransactionInterface> {
  //   const transaction =
  //     transactionType === 'income'
  //       ? await this.incomeModel.findById(transactionID).exec()
  //       : await this.expenseModel.findById(transactionID).exec();
  //   if (userID === transaction.user_id) {
  //     return transaction;
  //   }
  //   throw new UnauthorizedException('User must own transaction');
  // }

  async getAllTransactions(
    user: User,
    transactionType: IncomeOrExpense,
    budgetID: MongoDBID
  ): Promise<TransactionInterface[]> {
    const allTransactions =
      transactionType === 'income'
        ? await this.incomeModel.find().exec()
        : await this.expenseModel.find().exec();
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
    transactionID: MongoDBID,
    transactionDTO: TransactionDTO,
    transactionType: IncomeOrExpense
  ): Promise<TransactionInterface> {
    const editableTransaction =
      transactionType === 'income'
        ? await this.incomeModel.findByIdAndUpdate(
            transactionID,
            transactionDTO,
            {
              new: true,
            }
          )
        : await this.expenseModel.findByIdAndUpdate(
            transactionID,
            transactionDTO,
            {
              new: true,
            }
          );
    editableTransaction.last_date_edited = dateStamp();
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
    transactionID: MongoDBID,
    transactionType: IncomeOrExpense
  ): Promise<
    TransactionInterface & {
      _id: MongoDBID;
    }
  > {
    const deletedtransaction =
      transactionType === 'income'
        ? await this.incomeModel.findByIdAndRemove(transactionID)
        : await this.expenseModel.findByIdAndRemove(transactionID);
    if (deletedtransaction === null) {
      throw new NotFoundException('Transaction was already deleted.');
    } else if (user._id.toString() === deletedtransaction.user_id) {
      return deletedtransaction;
    }
    throw new UnauthorizedException('User must own transaction');
  }
}
