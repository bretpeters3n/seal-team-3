import React from "react";
import { Container, PageTitle } from "./Home.styles";
import { BudgetData } from "../../dummydata";

import { BudgetCardList } from "../../components";

const Home = () => {
  return (
    <Container>
      <PageTitle>Your Budgets</PageTitle>
      <BudgetCardList budgets={BudgetData} />
    </Container>
  );
};

export default Home;
