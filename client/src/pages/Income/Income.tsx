import React, { useState, useEffect } from "react";
import { Container } from "./Income.styles";
import { IncomeTracker, IncomeAdder } from "../../components";
import { AnimatePresence } from "framer-motion";
import { getAllItems } from "../../API/IEMethods";

export interface IncomeData {
  _id: string;
  title: string;
  amount: number;
  type: "Income" | "Expense";
}

const Income: React.FC = () => {
  const [displayAdder, setDisplayAdder] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [filteredIncomeData, setFilteredIncomeData] = useState<
    Array<IncomeData>
  >([]);

  const toggleChange = () => setChange(!change);

  useEffect(() => {
    retrieveIncomeData();
  }, [change]);

  const retrieveIncomeData = async () => {
    const data = await getAllItems("income");
    setFilteredIncomeData(data);
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
          <IncomeAdder
            setDisplayAdder={setDisplayAdder}
            toggleChange={toggleChange}
          />
        )}
      </AnimatePresence>
      <IncomeTracker
        setDisplayAdder={setDisplayAdder}
        filteredIncomeData={filteredIncomeData}
        toggleChange={toggleChange}
      />
    </Container>
  );
};

export default Income;
