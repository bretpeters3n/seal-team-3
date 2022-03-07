import axios, { AxiosError } from "axios";
import { TransactionTransferData, URL, TransactionType } from "../constants";

export const addItem = async (
  data: TransactionTransferData,
  type: TransactionType
) => {
  try {
    await axios.post(
      `${URL}/transactions/post${type === "expense" ? "Expense" : "Income"}`,
      {
        title: data.title,
        amount: data.amount,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }
    );
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};

export const getAllItems = async (type: TransactionType) => {
  try {
    const data = await axios
      .get(
        `${URL}/transactions/all${type === "expense" ? "Expenses" : "Incomes"}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .then((res) => res.data);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};

export const deleteItem = async (itemId: string, type: TransactionType) => {
  try {
    await axios.delete(
      `${URL}/transactions/delete${
        type === "expense" ? "Expense" : "Income"
      }/${itemId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }
    );
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};
