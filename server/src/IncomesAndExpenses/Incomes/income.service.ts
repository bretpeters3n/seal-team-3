import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { dateStamp } from 'src/utils/dateStamp';
import { IncomeOrExpense, IncomesAndExpenseInterface } from '../I&E.interfaces';
import { IncomeDTO } from './dto/income.dto';
import { MongoDBID } from 'src/shared/types';

@Injectable()
export class IncomeServices {
  constructor(
    @InjectModel('IncomeSchema')
    private readonly incomeModel: Model<IncomesAndExpenseInterface>
  ) {}

  //ALL INCOME METHODS
  async addIncome(IncomeDTO: IncomeDTO): Promise<IncomesAndExpenseInterface> {
    const newIncome = new this.incomeModel(IncomeDTO);
    newIncome.type = IncomeOrExpense.INCOME;
    newIncome.date_posted = dateStamp();
    newIncome.last_date_edited = dateStamp();
    return newIncome.save();
  }

  async getIncome(incomeID: MongoDBID): Promise<IncomesAndExpenseInterface> {
    const income = this.incomeModel.findById(incomeID).exec();
    return income;
  }

  async getAllIncomes(): Promise<IncomesAndExpenseInterface[]> {
    const allIncomes = this.incomeModel.find().exec();
    return allIncomes;
  }

  async editIncome(
    incomeID: MongoDBID,
    IncomeDTO: IncomeDTO
  ): Promise<IncomesAndExpenseInterface> {
    const editableIncome = await this.incomeModel.findByIdAndUpdate(
      incomeID,
      IncomeDTO,
      { new: true }
    );
    editableIncome.last_date_edited = dateStamp();
    return editableIncome;
  }

  async deleteIncome(incomeID: MongoDBID): Promise<
    IncomesAndExpenseInterface & {
      _id: MongoDBID;
    }
  > {
    const deletedIncome = await this.incomeModel.findByIdAndRemove(incomeID);
    return deletedIncome;
  }
}
