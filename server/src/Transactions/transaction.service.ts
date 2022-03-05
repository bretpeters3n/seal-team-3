import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { dateStamp } from 'src/utils/dateStamp';
import {
  IncomeOrExpense,
  TransactionInterface,
} from './transaction.interfaces';
import { MongoDBID } from 'src/shared/types';
import { User } from 'src/Auth/Auth.interfaces';
import { TransactionDTO } from './dto/transaction.dto';

@Injectable()
export class TransactionServices {
  constructor(
    @InjectModel('IncomeSchema')
    private readonly incomeModel: Model<TransactionInterface>,
    @InjectModel('ExpenseSchema')
    private readonly expenseModel: Model<TransactionInterface>,
    @InjectModel('UserSchema')
    private readonly userModel: Model<User>
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

  // how do we want to allow users to find specific transaction
  async getTransaction(
    userID: MongoDBID,
    transactionID: MongoDBID,
    transactionType: IncomeOrExpense
  ): Promise<TransactionInterface> {
    const transaction =
      transactionType === 'income'
        ? await this.incomeModel.findById(transactionID).exec()
        : await this.expenseModel.findById(transactionID).exec();
    if (userID === transaction.user_id) {
      return transaction;
    }
    throw new UnauthorizedException('User must own transaction');
  }

  async getAllTransactions(
    userID: MongoDBID,
    transactionType: IncomeOrExpense
  ): Promise<TransactionInterface[]> {
    const foundUser = this.userModel.findById(userID).exec();
    if (foundUser) {
      const allTransactions =
        transactionType === 'income'
          ? this.incomeModel.find().exec()
          : this.expenseModel.find().exec();
      return allTransactions;
    }
    throw new UnauthorizedException('User must own transactions');
  }

  async editTransaction(
    userID: MongoDBID,
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
    if (userID === editableTransaction.user_id) {
      return editableTransaction;
    }
    throw new UnauthorizedException('User must own transaction');
  }

  async deleteTransaction(
    userID: MongoDBID,
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
    if (userID === deletedtransaction.user_id) {
      return deletedtransaction;
    }
    throw new UnauthorizedException('User must own transaction');
  }
}
