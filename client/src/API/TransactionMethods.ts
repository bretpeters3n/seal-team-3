import axios, { AxiosError } from "axios";
import { TransactionTransferData, URL, BudgetIdType } from "../constants";

export const addItem = async (
  data: TransactionTransferData,
  budgetId: string | undefined,
  categoryId: string | undefined
) => {
  try {
    await axios.post(
      `${URL}/transactions/postTransaction/${budgetId}/${categoryId}`,
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

export const getAllItems = async (budgetId: BudgetIdType) => {
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
    if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};

export const deleteItem = async (
  budgetId: BudgetIdType,
  categoryId: string,
  itemId: string
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
    if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};

export const editItem = async (
  budgetId: BudgetIdType,
  categoryId: string,
  itemId: string,
  data: TransactionTransferData
) => {
  try {
    await axios.patch(
      `${URL}/transactions/editTransaction/${budgetId}/${categoryId}/${itemId}`,
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

// export const getItem = async (itemId: string, type: TransactionType) => {
//   try {
//     const response = await axios.get(
//       `${URL}/transactions/get${
//         type === "expense" ? "Expense" : "Income"
//       }/${itemId}`,
//       {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
//         },
//       }
//     );
//     if (response) {
//       // code if response is true
//     }
//   } catch (e) {
//     const err = e as AxiosError;
//     if (err.response?.data?.statusCode > 401) {
//       alert(err.response?.data?.message);
//     }
//   }
// };
