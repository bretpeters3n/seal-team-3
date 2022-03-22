import React, { useEffect } from "react";
import { Container } from "./Budget.styles";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getBudgetById } from "../../API/BudgetMethods";
import { IBudget } from "../../constants";

const Budget = () => {
  const { budgetId } = useParams();
  const navigate = useNavigate();
  const fetchBudgetData = async () => {
    const data: IBudget = await getBudgetById(budgetId!, navigate);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery(
    "budget",
    fetchBudgetData
  );

  useEffect(() => {
    refetch();
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <Container>
      <Outlet context={{ data, refetch }} />
    </Container>
  );
};

export default Budget;
