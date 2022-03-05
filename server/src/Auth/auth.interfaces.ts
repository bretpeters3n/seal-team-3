import { Document } from 'mongoose';

//interface, what structure you want the data to be in.
export interface User extends Document {
  readonly email: string;
  password: string;
  readonly first_name: string;
  readonly last_name: string;
  account_created: string;
}
