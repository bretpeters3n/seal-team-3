import React, { useState, useEffect } from "react";
import { Container } from "./Income.styles";
import { IncomeTracker, IncomeAdder } from "../../components";
import { AnimatePresence } from "framer-motion";

export interface IncomeData {
  id: number;
  title: string;
  amount: number;
}

// Static dummy DATA for example list
const dummyIncomeData: Array<IncomeData> = [
  {
    id: 1,
    title: "Weekly Check",
    amount: 1200,
  },
  {
    id: 2,
    title: "Tax Return",
    amount: 3500,
  },
  {
    id: 3,
    title: "Gifted",
    amount: 600,
  },
];

const Income = () => {
  const [displayAdder, setDisplayAdder] = useState<boolean>(false);
  const [filteredIncomeData, setFilteredIncomeData] =
    useState<Array<IncomeData>>(dummyIncomeData);

  useEffect(() => {}, [filteredIncomeData]);

  const deleteItem = (targetId: number) => {
    setFilteredIncomeData(
      filteredIncomeData.filter((item) => item.id !== targetId)
    );
  };

  const addItem = (newItem: IncomeData) => {
    setFilteredIncomeData([...filteredIncomeData, newItem]);
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
          <IncomeAdder setDisplayAdder={setDisplayAdder} addItem={addItem} />
        )}
      </AnimatePresence>
      <IncomeTracker
        setDisplayAdder={setDisplayAdder}
        deleteItem={deleteItem}
        filteredIncomeData={filteredIncomeData}
      />
    </Container>
  );
};

export default Income;
