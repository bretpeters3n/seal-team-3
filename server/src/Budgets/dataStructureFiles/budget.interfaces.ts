import { Document } from 'mongoose';
import { MongoDBID } from 'src/shared/types';

export interface BudgetInterface extends Document {
  readonly month: string;
  readonly year: string;
  readonly total: number;
  readonly currentAmount: number;
  date_created: string;
  last_date_edited: String;
  user_id: MongoDBID;
}
