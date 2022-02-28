import React, { useEffect, useState } from "react";
import { IncomeItem, BudgetNavbar } from "../../components";
import { BsPlusCircle } from "react-icons/bs";
import {
  Container,
  IncomeContainer,
  TitleContainer,
  Title,
  Button,
} from "./IncomeTracker.styles";
import { AnimatePresence } from "framer-motion";

interface IncomeData {
  id: number;
  title: string;
  amount: number;
}

interface IncomeTrackerProps {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
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

const IncomeTracker: React.FC<IncomeTrackerProps> = ({ setDisplayAdder }) => {
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
    <Container>
      <IncomeContainer>
        <TitleContainer>
          <Title>Monthly Income</Title>
          <Button onClick={() => setDisplayAdder(true)}>
            <BsPlusCircle size="2rem" />
          </Button>
        </TitleContainer>
        <AnimatePresence>
          {filteredIncomeData?.map((item) => (
            <IncomeItem
              key={item.id}
              id={item.id}
              title={item.title}
              amount={item.amount}
              deleteItem={deleteItem}
            />
          ))}
        </AnimatePresence>
      </IncomeContainer>
    </Container>
  );
};

export default IncomeTracker;
