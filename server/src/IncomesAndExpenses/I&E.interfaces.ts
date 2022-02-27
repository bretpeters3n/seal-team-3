import { Document } from 'mongoose';

export enum IncomeOrExpense {
  EXPENSE = 'Expense',
  INCOME = 'Income',
}

export interface IncomesAndExpenseInterface extends Document {
  readonly title: string;
  readonly amount: number;
  readonly first_name: string;
  readonly last_name: string;
  type: IncomeOrExpense;
  date_posted: string;
  last_date_edited: String;
}
