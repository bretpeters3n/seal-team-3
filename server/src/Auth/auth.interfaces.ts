import { Document } from 'mongoose';

export interface SignUpInterface extends Document {
  readonly email: string;
  readonly password: string;
  readonly first_name: string;
  readonly last_name: string;
  date_created: string;
}

export interface LogInInterface extends Document {
  readonly email: string;
  readonly password: string;
}
