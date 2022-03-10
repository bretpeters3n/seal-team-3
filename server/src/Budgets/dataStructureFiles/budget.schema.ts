import * as mongoose from 'mongoose';

export const BudgetSchema = new mongoose.Schema({
  month: { type: String, required: true },
  year: { type: String, required: true },
  total: { type: Number, required: true },
  currentAmount: { type: Number, required: true },
  date_created: String,
  last_date_edited: String,
  user_id: String,
});
