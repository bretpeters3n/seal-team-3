import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  date_posted: String,
  last_date_edited: String,
  user_id: { type: String, required: true },
  budget_id: { type: String, required: true },
  category_id: { type: String, required: true },
});
