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
    @InjectModel('TransactionSchema')
    private readonly transactionModel: Model<TransactionInterface>
  ) {}

  // ALL TRANSACTION METHODS
  async addTransaction(
    incomingDTO: TransactionDTO,
    user: User,
    budget_id: MongoDBID
  ): Promise<TransactionInterface> {
    const newTransaction = new this.transactionModel(incomingDTO);
    newTransaction.type =
      incomingDTO.amount < 0 ? IncomeOrExpense.EXPENSE : IncomeOrExpense.INCOME;
    newTransaction.date_posted = dateStamp();
    newTransaction.last_date_edited = dateStamp();
    newTransaction.user_id = user._id;
    newTransaction.budget_id = budget_id;
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

  // Start here. This one and delete aren't working.
  async editTransaction(
    user: User,
    transactionID: MongoDBID,
    transactionDTO: TransactionDTO
  ): Promise<TransactionInterface> {
    const editableTransaction = await this.transactionModel.findByIdAndUpdate(
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
    transactionID: MongoDBID
  ): Promise<
    TransactionInterface & {
      _id: MongoDBID;
    }
  > {
    const deletedtransaction = await this.transactionModel.findByIdAndRemove(
      transactionID
    );
    if (deletedtransaction === null) {
      throw new NotFoundException('Transaction was already deleted.');
    } else if (user._id.toString() === deletedtransaction.user_id) {
      return deletedtransaction;
    }
    throw new UnauthorizedException('User must own transaction');
  }
}
