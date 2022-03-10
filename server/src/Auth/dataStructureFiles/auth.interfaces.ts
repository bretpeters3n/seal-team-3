import { Document } from 'mongoose';

//interface, what structure you want the data to be in.
export interface User extends Document {
  readonly email: string;
  password: string;
  readonly firstName: string;
  readonly lastName: string;
  accountCreated: string;
}
