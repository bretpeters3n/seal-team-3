import axios from "axios";
import { TransactionTransferData, URL, TransactionType } from "../constants";

export const addItem = async (
  data: TransactionTransferData,
  type: TransactionType
) => {
  try {
    await axios.post(
      `${URL}/${type === "expense" ? "Expenses" : "Incomes"}/post${
        type === "expense" ? "Expense" : "Income"
      }`,
      {
        title: data.title,
        amount: data.amount,
      }
    );
  } catch (err: any) {
    alert(err.response.data.message[0]);
  }
};

export const getAllItems = async (type: TransactionType) => {
  try {
    const data = await axios
      .get(
        `${URL}/${type === "expense" ? "Expenses" : "Incomes"}/all${
          type === "expense" ? "Expenses" : "Incomes"
        }`
      )
      .then((res) => res.data);
    return data;
  } catch (err: any) {
    alert(err.response.data.message[0]);
  }
};

export const deleteItem = async (itemId: string, type: TransactionType) => {
  try {
    await axios.delete(
      `${URL}/${type === "expense" ? "Expenses" : "Incomes"}/delete${
        type === "expense" ? "Expense" : "Income"
      }/${itemId}`
    );
  } catch (err: any) {
    alert(err.response.data.message[0]);
  }
};
