import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_created: String,
});

UserSchema.methods.toJSON = function () {
  let userObject = this.toObject();
  delete userObject.password;
  return userObject;
};
