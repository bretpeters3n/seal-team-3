import { Document, Types } from 'mongoose';
import { MongoDBID } from 'src/shared/types';
import { TransactionInterface } from 'src/Transactions/dataStructureFiles/transaction.interfaces';

export interface BudgetInterface extends Document {
  readonly title: string;
  readonly total: number;
  readonly currentAmount: number;
  created: boolean;
  date_created: string;
  last_date_edited: String;
  user_id: MongoDBID;
  categories: Types.DocumentArray<Category>;
}

export interface BudgetDummyData {
  title: string;
  total: number;
  currentAmount: number;
  created: boolean;
}
export interface Category {
  readonly title: string;
  amount: number;
  transactions: Types.DocumentArray<TransactionInterface>;
}
