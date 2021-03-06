import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router";
import { TransactionTransferData, URL, BudgetIdType } from "../constants";

export const addItem = async (
  data: TransactionTransferData,
  budgetId: string | undefined,
  categoryId: string | undefined,
  navigate: NavigateFunction
) => {
  try {
    await axios.post(
      `${URL}/transactions/postTransaction/${budgetId}/${categoryId}`,
      {
        title: data.title,
        amount: data.amount,
        categoryId: data.categoryId,
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
    if (err.response?.data?.statusCode === 401) {
      alert("Auth token may have expired");
      sessionStorage.setItem("authToken", "");
      navigate("/login");
    } else if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};

export const getAllItems = async (
  budgetId: BudgetIdType,
  navigate: NavigateFunction
) => {
  try {
    const data = await axios
      .get(`${URL}/transactions/allTransactions/${budgetId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      })
      .then((res) => res.data);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.statusCode === 401) {
      alert("Auth token may have expired");
      sessionStorage.setItem("authToken", "");
      navigate("/login");
    } else if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};

export const deleteItem = async (
  budgetId: BudgetIdType,
  categoryId: string,
  itemId: string,
  navigate: NavigateFunction
) => {
  try {
    await axios.delete(
      `${URL}/transactions/deleteTransaction/${budgetId}/${categoryId}/${itemId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }
    );
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.statusCode === 401) {
      alert("Auth token may have expired");
      sessionStorage.setItem("authToken", "");
      navigate("/login");
    } else if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};

export const editItem = async (
  budgetId: BudgetIdType,
  prevCategoryId: string,
  itemId: string,
  data: TransactionTransferData,
  navigate: NavigateFunction
) => {
  try {
    await axios.patch(
      `${URL}/transactions/editTransaction/${budgetId}/${prevCategoryId}/${itemId}`,
      {
        title: data.title,
        amount: data.amount,
        category_id: data.categoryId,
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
    if (err.response?.data?.statusCode === 401) {
      alert("Auth token may have expired");
      sessionStorage.setItem("authToken", "");
      navigate("/login");
    } else if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};
