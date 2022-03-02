import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import { ExpenseItem, BudgetNavbar } from "../../components";
import {
  Container,
  ExpenseContainer,
  TitleContainer,
  Title,
  Button,
} from "./ExpenseTracker.styles";

interface ExpensesProps {
    id: number;
    title: string;
    amount: number;
}

interface ExpenseProps {
    setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
}

//Dummy Items
const dummyExpenseData: Array<ExpensesProps> = [
    {
      id: 1,
      title: "Doordash",
      amount: 59.50,
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


const ExpenseTracker: React.FC<ExpenseProps> = ({ setDisplayAdder }) => {
    return (
      <Container>
        <ExpenseContainer>
          <TitleContainer>
            <Title>Monthly Expenses</Title>
            <Button onClick={() => setDisplayAdder(true)}>
              <BsPlusCircle size="1.5rem" />
            </Button>
          </TitleContainer>
          {dummyExpenseData.map((item) => (
            <ExpenseItem
              key={item.id}
              id={item.id}
              title={item.title}
              amount={item.amount}
            />
          ))}
        </ExpenseContainer>
      </Container>
    );
  };

export default ExpenseTracker;