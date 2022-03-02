import React from "react";
import { Container } from "./Budget.styles";
import { BudgetNavbar } from "../../components";
import { Outlet } from "react-router-dom";

const Budget = () => {
  return (
    <Container>
      <BudgetNavbar />
      <Outlet />
    </Container>
  );
};

export default Budget;
