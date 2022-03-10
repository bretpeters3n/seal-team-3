import React from "react";
import { Container, PageTitle } from "./Home.styles";
import { BudgetCardList } from "../../components";
import { BudgetData } from "../../dummydata";

const Home = () => {
  return (
    <>
      <PageTitle>Your Budgets</PageTitle>
      <Container>
        <BudgetCardList budgets={BudgetData} />
      </Container>
    </>
  );
};

export default Home;
