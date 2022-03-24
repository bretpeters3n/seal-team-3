import * as yup from "yup";

export const URL =
  window.location.href === "http://localhost:3000"
    ? "http://localhost:5000"
    : "https://budgety-nest.uc.r.appspot.com/";

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
  categoryId: string;
}

export interface BudgetTransferData {
  title: string;
  total: number;
  currentAmount: number;
}

export type TransactionType = "income" | "expense";

export type BudgetIdType = string | undefined;

export interface ItemData {
  _id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category_id: string;
}

export interface IBudgetData {
  _id?: string;
  title: string;
  total: number;
  currentAmount: number;
  created: boolean;
  categories?: object[];
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

export interface ITransaction {
  title: string;
  amount: number;
  type: string;
  userId: string;
  budgetId: string;
  categoryId: string;
  _id: string;
}

export interface ICategory {
  title: string;
  amount: number;
  transactions: ITransaction[];
  _id: string;
}

export interface IBudget {
  title: string;
  total: number;
  currentAmount: number;
  _id?: string;
  categories?: ICategory[];
  userId?: string;
  created: boolean;
  date_created?: string;
  last_date_edited?: string;
  __v?: number;
}

export interface IFinanceTip {
  title: string;
  author: string;
}

export const TransactionSchema = yup.object().shape({
  title: yup.string().min(2).max(50).required("field is required"),
  amount: yup.string().required("field is required"),
});

export const TransactionAddSchema = yup.object().shape({
  title: yup.string().min(2).max(50).required("field is required"),
  amount: yup
    .number()
    .typeError("Must be a number")
    .required("field is required"),
});

export const CreateBudgetSchema = yup.object().shape({
  total: yup
    .number()
    .typeError("must be a number")
    .moreThan(0, "must be more than $0")
    .required("field is required"),
});
