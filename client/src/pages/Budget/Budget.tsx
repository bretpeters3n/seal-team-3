import React, { useState, useEffect } from "react";
import { Container } from "./Budget.styles";
import { BudgetNavbar } from "../../components";
import { Outlet, useLocation } from "react-router-dom";

const Budget = () => {
  const data: any = useLocation();
  const [budgetData, setBudgetData] = useState<any>(data);

  useEffect(() => {
    setBudgetData(data);
  }, []);

  return (
    <Container>
      <BudgetNavbar />
      <Outlet context={budgetData} />
    </Container>
  );
};

export default Budget;
