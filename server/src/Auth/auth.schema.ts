import * as mongoose from 'mongoose';

export const SignUpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_created: String,
});

export const LogInSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
