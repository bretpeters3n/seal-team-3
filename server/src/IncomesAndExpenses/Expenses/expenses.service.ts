import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { dateStamp } from 'src/utils/dateStamp';
import {
  IncomeOrExpense,
  IncomesAndExpenseInterface,
} from '../interfaces/I&E.interfaces';
import { ExpenseDTO } from './dto/Expense.dto';

@Injectable()
export class ExpenseServices {
  constructor(
    @InjectModel('ExpenseSchema')
    private readonly expenseModel: Model<IncomesAndExpenseInterface>
  ) {}

  //ALL EXPENSE METHODS
  async addExpense(
    ExpenseDTO: ExpenseDTO
  ): Promise<IncomesAndExpenseInterface> {
    const newExpense = new this.expenseModel(ExpenseDTO);
    newExpense.type = IncomeOrExpense.EXPENSE;
    newExpense.date_posted = dateStamp();
    newExpense.last_date_edited = dateStamp();
    return newExpense.save();
  }

  async getExpense(expenseID): Promise<IncomesAndExpenseInterface> {
    const expense = this.expenseModel.findById(expenseID).exec();
    return expense;
  }

  async getAllExpenses(): Promise<IncomesAndExpenseInterface[]> {
    const allExpenses = this.expenseModel.find().exec();
    return allExpenses;
  }

  async editExpense(
    expenseID,
    ExpenseDTO: ExpenseDTO
  ): Promise<IncomesAndExpenseInterface> {
    const editableExpense = await this.expenseModel.findByIdAndUpdate(
      expenseID,
      ExpenseDTO,
      { new: true }
    );
    editableExpense.last_date_edited = dateStamp();
    return editableExpense;
  }

  async deleteExpense(expenseID): Promise<any> {
    const deletableExpense = await this.expenseModel.findByIdAndRemove(
      expenseID
    );
    return deletableExpense;
  }
}
