import axios from "axios";
import { IncomeExpenseTransferData, URL } from "../constants";

export const addExpenseItem = async (
  expenseData: IncomeExpenseTransferData
) => {
  try {
    await axios.post(`${URL}/Expenses/postExpense`, {
      title: expenseData.title,
      amount: expenseData.amount,
      first_name: expenseData.first_name,
      last_name: expenseData.last_name,
    });
  } catch (err: any) {
    if (err.response.status > 399) {
      alert(err.response.data.message[0]);
    }
  }
};

export const getAllExpenseItems = async () => {
  try {
    const data = await axios
      .get(`${URL}/Expenses/allExpenses`)
      .then((res) => res.data);
    console.log(data);
    return data;
  } catch (err: any) {
    alert(err.response.data.message[0]);
  }
};

export const deleteExpenseItem = async (expenseId: string) => {
  try {
    await axios.delete(`${URL}/Expenses/deleteExpense/${expenseId}`);
  } catch (err: any) {
    console.log("ERROR", err);
  }
};
