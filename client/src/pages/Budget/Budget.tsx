import React from "react";
import { Container } from "./Budget.styles";
import { BudgetNavbar } from "../../components";
import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getBudgetById } from "../../API/BudgetMethods";
import { IBudget } from "../../constants";

const Budget = () => {
  const { budgetId } = useParams();
  const fetchBudgetData = async () => {
    const data: IBudget = await getBudgetById(budgetId!);
    return data;
  };

  const { data, isLoading, isError, isFetching, refetch } = useQuery(
    "budget",
    fetchBudgetData
  );

  const doRefetch = () => {
    refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <Container>
      {isFetching && <h1>Updating Budget Data...</h1>}
      <BudgetNavbar />
      <Outlet context={{ data, doRefetch }} />
    </Container>
  );
};

export default Budget;
