import React, { useEffect, useState } from "react";
import { Container } from "./Expenses.styles";
import { ExpenseTracker, ExpenseAdder } from "../../components";
import { AnimatePresence } from "framer-motion";
import { getAllItems } from "../../API/IEMethods";

export interface ExpenseData {
  _id: string;
  title: string;
  amount: number;
  type: "Income" | "Expense";
}

const Expenses = () => {
  const [displayAdder, setDisplayAdder] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [filteredExpenseData, setFilteredExpenseData] = useState<
    Array<ExpenseData>
  >([]);

  const toggleChange = () => setChange(!change);

  useEffect(() => {
    retrieveExpenseData();
  }, [change]);

  const retrieveExpenseData = async () => {
    const data = await getAllItems("expense");
    setFilteredExpenseData(data);
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
          <ExpenseAdder
            setDisplayAdder={setDisplayAdder}
            toggleChange={toggleChange}
          />
        )}
      </AnimatePresence>
      <ExpenseTracker
        setDisplayAdder={setDisplayAdder}
        filteredExpenseData={filteredExpenseData}
        toggleChange={toggleChange}
      />
    </Container>
  );
};

export default Expenses;
