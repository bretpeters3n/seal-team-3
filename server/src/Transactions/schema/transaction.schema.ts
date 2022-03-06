import * as mongoose from 'mongoose';

export const IncomeSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  type: String,
  date_posted: String,
  last_date_edited: String,
  user_id: String,
});

export const ExpenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  type: String,
  date_posted: String,
  last_date_edited: String,
  user_id: String,
});
