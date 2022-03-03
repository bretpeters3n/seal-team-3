import React from "react";
import { ExpenseItem } from "../../components";
import { BsPlusCircle } from "react-icons/bs";
import {
  Container,
  ExpenseContainer,
  TitleContainer,
  Title,
  Button,
} from "./ExpenseTracker.styles";
import { AnimatePresence } from "framer-motion";
import { ExpenseData } from "../../pages/Expenses/Expenses";

interface ExpenseTrackerProps {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  filteredExpenseData: ExpenseData[];
  toggleChange: () => void;
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({
  setDisplayAdder,
  filteredExpenseData,
  toggleChange,
}) => {
  return (
    <Container>
      <ExpenseContainer>
        <TitleContainer>
          <Title>Monthly Expenses</Title>
          <Button onClick={() => setDisplayAdder(true)}>
            <BsPlusCircle size="1.5rem" />
          </Button>
        </TitleContainer>
        <AnimatePresence>
          {filteredExpenseData.map((item) => (
            <ExpenseItem
              key={item._id}
              id={item._id}
              title={item.title}
              amount={item.amount}
              toggleChange={toggleChange}
            />
          ))}
        </AnimatePresence>
      </ExpenseContainer>
    </Container>
  );
};

export default ExpenseTracker;
