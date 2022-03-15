import React from "react";
import { Container } from "./BudgetMain.styles";
import { useOutletContext } from "react-router-dom";

interface ICategory {
  title: string;
  amount: number;
  transaction: [];
  _id: string;
}

const BudgetMain: React.FC = () => {
  const budgetData: any = useOutletContext();

  console.log("id", budgetData);

  return (
    <Container>
      <h1>Budget MAIN PAGE</h1>
      {budgetData.state.categories.map((category: ICategory) => (
        <h2 key={category.title}>{category.title}</h2>
      ))}
    </Container>
  );
};

export default BudgetMain;
