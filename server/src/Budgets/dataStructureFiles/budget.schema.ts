import * as mongoose from 'mongoose';
import { TransactionSchema } from 'src/Transactions/dataStructureFiles/transaction.schema';

const categorySchema = new mongoose.Schema({
  title: String,
  amount: Number,
  transactions: [TransactionSchema],
});

export const BudgetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  total: { type: Number, required: true },
  currentAmount: { type: Number, required: true },
  created: Boolean,
  date_created: String,
  last_date_edited: String,
  user_id: String,
  categories: [categorySchema],
});
