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
  deleteItem: (targetId: number) => void;
  filteredExpenseData: ExpenseData[];
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({
  setDisplayAdder,
  deleteItem,
  filteredExpenseData,
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
              key={item.id}
              id={item.id}
              title={item.title}
              amount={item.amount}
              deleteItem={deleteItem}
            />
          ))}
        </AnimatePresence>
      </ExpenseContainer>
    </Container>
  );
};

export default ExpenseTracker;
