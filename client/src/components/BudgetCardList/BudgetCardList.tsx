import React from "react";
import { Container } from "./BudgetCardList.styles";
import { BudgetCard } from "../../components";
import { IBudgetData } from "../../constants";

interface IBudgetCardList {
  budgets: Array<IBudgetData>;
}

const BudgetCardList: React.FC<IBudgetCardList> = ({ budgets }) => {
  return (
    <Container>
      {budgets.map((budget) => (
        <BudgetCard key={budget._id} budget={budget} />
      ))}
    </Container>
  );
};

export default BudgetCardList;
