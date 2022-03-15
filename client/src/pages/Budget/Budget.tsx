import React from "react";
import { Container } from "./Budget.styles";
import { BudgetNavbar } from "../../components";
import { Outlet, useParams } from "react-router-dom";

const Budget = () => {
  const { budgetId } = useParams();

  console.log(budgetId);

  return (
    <Container>
      <BudgetNavbar />
      <Outlet />
    </Container>
  );
};

export default Budget;
