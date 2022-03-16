import React from "react";
import { Container, PageTitle } from "./Home.styles";
import { BudgetCardList } from "../../components";
import { useQuery } from "react-query";
import { getAllBudgets } from "../../API/BudgetMethods";

const Home = () => {
  const fetchAllBudgets = async () => {
    const data = await getAllBudgets();
    return data;
  };

  const { data, isLoading, status, refetch } = useQuery(
    "budgets",
    fetchAllBudgets,
    {}
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>{status}</div>;
  }

  return (
    <Container>
      <PageTitle>Your Budgets</PageTitle>
      <BudgetCardList budgets={data} refetch={refetch} />
    </Container>
  );
};

export default Home;
