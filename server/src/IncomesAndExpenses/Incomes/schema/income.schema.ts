import * as mongoose from 'mongoose';

export const IncomeSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  first_name: String,
  last_name: String,
  type: String,
  date_posted: String,
  last_date_edited: String,
});
