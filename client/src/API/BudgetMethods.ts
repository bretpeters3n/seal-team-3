import axios, { AxiosError } from "axios";
import { URL, BudgetTransferData } from "../constants";

// CREATE New Budget
export const createBudget = async (data: BudgetTransferData) => {
  try {
    await axios.post(
      `${URL}/budgets/createBudget`,
      {
        month: data.month,
        year: data.year,
        total: data.total,
        currentAmount: data.currentAmount,
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

// PATCH Budget by ID
export const editBudget = async (
  budgetId: string,
  data: BudgetTransferData
) => {
  try {
    await axios.patch(
      `${URL}/budgets/editBudget/${budgetId}`,
      {
        month: data.month,
        year: data.year,
        total: data.total,
        currentAmount: data.currentAmount,
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

// GET All Budgets
export const getAllBudgets = async () => {
  try {
    const data = await axios
      .get(`${URL}/budgets/allBudgets`, {
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
