import React from "react";
import { Container } from "./BudgetMain.styles";
import { useOutletContext } from "react-router-dom";
import { ICategory } from "../../constants";

const BudgetMain: React.FC = () => {
  const budgetData = useOutletContext<any>();

  console.log(typeof budgetData);

  return (
    <Container>
      <h1>Budget MAIN PAGE</h1>
      <div>{budgetData[0]._id}</div>
      <div>{budgetData[0].title}</div>
      <div>{budgetData[0].total}</div>
      <div>{budgetData[0].currentAmount}</div>
      {budgetData[0].categories.map((category: ICategory) => (
        <h2 key={category.title}>{category.title}</h2>
      ))}
    </Container>
  );
};

export default BudgetMain;
