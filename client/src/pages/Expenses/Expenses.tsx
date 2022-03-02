import React, { useEffect, useState } from "react";
import { Container } from "./Expenses.styles";
import { ExpenseTracker, ExpenseAdder } from "../../components";
import { AnimatePresence } from "framer-motion";

export interface ExpenseData {
  id: number;
  title: string;
  amount: number;
}

// Dummy Items for Expense
const dummyExpenseData: Array<ExpenseData> = [
  {
    id: 1,
    title: "Doordash",
    amount: 59.5,
  },
  {
    id: 2,
    title: "Rent",
    amount: 1900,
  },
  {
    id: 3,
    title: "Electricity",
    amount: 220,
  },
];

const Expenses = () => {
  const [displayAdder, setDisplayAdder] = useState<boolean>(false);
  const [filteredExpenseData, setFilteredExpenseData] =
    useState<Array<ExpenseData>>(dummyExpenseData);

  useEffect(() => {}, [filteredExpenseData]);

  const deleteItem = (targetId: number) => {
    setFilteredExpenseData(
      filteredExpenseData.filter((item) => item.id !== targetId)
    );
  };

  const addItem = (newItem: ExpenseData) => {
    setFilteredExpenseData([...filteredExpenseData, newItem]);
  };

  return (
    <Container
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.35 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <AnimatePresence>
        {displayAdder && (
          <ExpenseAdder setDisplayAdder={setDisplayAdder} addItem={addItem} />
        )}
      </AnimatePresence>
      <ExpenseTracker
        setDisplayAdder={setDisplayAdder}
        deleteItem={deleteItem}
        filteredExpenseData={filteredExpenseData}
      />
    </Container>
  );
};

export default Expenses;
