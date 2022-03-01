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
import { IncomeData } from "../../pages/Income/Income";

interface IncomeTrackerProps {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  deleteItem: (targetId: number) => void;
  filteredIncomeData: IncomeData[];
}

const IncomeTracker: React.FC<IncomeTrackerProps> = ({
  setDisplayAdder,
  deleteItem,
  filteredIncomeData,
}) => {
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
