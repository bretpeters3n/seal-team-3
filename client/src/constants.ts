export const URL = "http://localhost:5000";

export interface LoginData {
  email: string;
  password: string;
}

export interface UserInfoData extends LoginData {
  firstName: string;
  lastName: string;
}

export interface IncomeExpenseTransferData {
  title: string;
  amount: number;
  first_name?: string | undefined;
  last_name?: string | undefined;
}

export type TransactionType = "income" | "expense";

export interface ItemData {
  _id: string;
  title: string;
  amount: number;
  type: TransactionType;
}
