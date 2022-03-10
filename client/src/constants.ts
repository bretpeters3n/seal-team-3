import * as yup from "yup";

export const URL = "http://localhost:5000";

export interface LoginData {
  email: string;
  password: string;
}

export interface UserInfoData extends LoginData {
  firstName: string;
  lastName: string;
}

export interface TransactionTransferData {
  title: string;
  amount: number;
}

export interface BudgetTransferData {
  month: string;
  year: string;
  total: number;
  currentAmount: number;
}

export type TransactionType = "income" | "expense";

export interface ItemData {
  _id: string;
  title: string;
  amount: number;
  type: TransactionType;
}

export interface IBudgetData {
  _id: string;
  month: string;
  year: string;
  total: number;
  currentAmount: number;
  active: boolean;
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

// Needed for form validation using yup
export const TransactionSchema = yup.object().shape({
  title: yup.string().min(2).max(50).required("field is required"),
  amount: yup
    .number()
    .typeError("must be a number")
    .positive("must be positive")
    .min(0)
    .test("maxDigitsAfterDecimal", "up to 2 decimals only", (amount: any) =>
      /^\d+(\.\d{1,2})?$/.test(amount?.toString())
    )
    .required("field is required"),
});
