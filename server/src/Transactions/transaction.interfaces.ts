import { Document } from 'mongoose';
import { MongoDBID } from 'src/shared/types';

export enum IncomeOrExpense {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export interface TransactionInterface extends Document {
  readonly title: string;
  readonly amount: number;
  type: IncomeOrExpense;
  date_posted: string;
  last_date_edited: String;
  user_id: MongoDBID;
}
