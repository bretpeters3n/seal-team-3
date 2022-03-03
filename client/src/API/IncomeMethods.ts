import axios from "axios";
import { IncomeExpenseTransferData, URL } from "../constants";

export const addIncomeItem = async (incomeData: IncomeExpenseTransferData) => {
  try {
    await axios.post(`${URL}/Incomes/postIncome`, {
      title: incomeData.title,
      amount: incomeData.amount,
      first_name: incomeData.first_name,
      last_name: incomeData.last_name,
    });
  } catch (err: any) {
    if (err.response.status > 399) {
      alert(err.response.data.message[0]);
    }
  }
};

export const getAllIncomeItems = async () => {
  try {
    const data = await axios
      .get(`${URL}/Incomes/allIncomes`)
      .then((res) => res.data);
    console.log(data);
    return data;
  } catch (err: any) {
    alert(err.response.data.message[0]);
  }
};

export const deleteIncomeItem = async (incomeId: string) => {
  try {
    await axios.delete(`${URL}/Incomes/deleteIncome/${incomeId}`);
  } catch (err: any) {
    console.log("ERROR", err);
  }
};
