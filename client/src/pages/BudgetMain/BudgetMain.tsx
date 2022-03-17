import React from "react";
import { Container } from "./BudgetMain.styles";
import { useOutletContext } from "react-router-dom";
import { ICategory, IBudget } from "../../constants";

const BudgetMain: React.FC = () => {
  const budgetData: IBudget = useOutletContext();

  return (
    <Container>
      <h1>Budget MAIN PAGE</h1>
      <div>{budgetData._id}</div>
      <div>{budgetData.title}</div>
      <div>{budgetData.total}</div>
      <div>{budgetData.currentAmount}</div>
      {budgetData.categories &&
        budgetData.categories.map((category: ICategory) => (
          <h2 key={category.title}>{category.title}</h2>
        ))}
    </Container>
  );
};

export default BudgetMain;
