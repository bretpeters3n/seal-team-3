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
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

export const editItem = async (itemId: string, type: TransactionType) => {
  try {
    await axios.patch(
      `${URL}/transactions/edit${
        type === "expense" ? "Expense" : "Income"
      }/${itemId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

export const getItem = async (itemId: string, type: TransactionType) => {
  try {
    const response = await axios.get(
      `${URL}/transactions/get${
        type === "expense" ? "Expense" : "Income"
      }/${itemId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    if (response) {
      // code if response is true
    }
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};
