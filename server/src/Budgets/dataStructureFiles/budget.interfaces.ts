import { Document } from 'mongoose';
import { MongoDBID } from 'src/shared/types';

export interface BudgetInterface extends Document {
  readonly title: string;
  readonly total: number;
  readonly currentAmount: number;
  created: boolean;
  date_created: string;
  last_date_edited: String;
  user_id: MongoDBID;
}

export interface budgetDummyData {
  title: string;
  total: number;
  currentAmount: number;
  created: boolean;
}
