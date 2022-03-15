import create from "zustand";

interface Transaction {
  title: string;
  amount: number;
  type: "income" | "expense";
  userId: string;
  budgetId: string;
  categoryId: string;
  _id: string;
}

interface Category {
  title: string;
  amount: number;
  transactions: Transaction[];
  _id: string;
}

interface Budget {
  title: string;
  total: number;
  currentAmount: number;
  _id?: string;
  categories?: Category[];
  userId?: string;
  created: boolean;
}

type BudgetState = {
  storeBudgets: Budget[];
  setStoreBudgets: (data: Budget[]) => void;
};

export const useStore = create<BudgetState>((set) => ({
  storeBudgets: [],
  setStoreBudgets: (data: Budget[]) => set({ storeBudgets: data }),
}));
