import React from "react";
import { Container, PageTitle } from "./Home.styles";
import { BudgetCardList } from "../../components";

const Home = () => {
  console.log(sessionStorage.getItem("authToken"));
  return (
    <Container>
      <PageTitle>Your Budgets</PageTitle>
      <BudgetCardList />
    </Container>
  );
};

export default Home;
