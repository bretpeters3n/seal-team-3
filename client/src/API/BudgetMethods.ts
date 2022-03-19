import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router";
import { URL, BudgetTransferData } from "../constants";

// CREATE New Budget
export const createBudget = async (
  navigate: NavigateFunction,
  data: BudgetTransferData
) => {
  try {
    await axios.post(
      `${URL}/budgets/createBudget`,
      {
        title: data.title,
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
    if (err.response?.data?.statusCode === 401) {
      alert("Auth token may have expired");
      navigate("/login");
    } else if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};

// PATCH Budget by ID
export const editBudget = async (
  navigate: NavigateFunction,
  budgetId: string,
  data: BudgetTransferData
) => {
  try {
    await axios.patch(
      `${URL}/budgets/editBudget/${budgetId}`,
      {
        title: data.title,
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
    if (err.response?.data?.statusCode === 401) {
      alert("Auth token may have expired");
      navigate("/login");
    } else if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};

// GET All Budgets
export const getAllBudgets = async (navigate: NavigateFunction) => {
  try {
    const data = await axios
      .get(`${URL}/budgets/getAllBudgets`, {
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
      navigate("/login");
    } else if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};

// GET Budget by Budget ID
export const getBudgetById = async (
  budgetId: string,
  navigate: NavigateFunction
) => {
  try {
    const data = await axios
      .get(`${URL}/budgets/getBudget/${budgetId}`, {
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
      navigate("/login");
    } else if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};
