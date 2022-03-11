import React from "react";
import { Container, PageTitle, Carousel } from "./Home.styles";
import { BudgetCardList } from "../../components";

const Home = () => {
  return (
    <Container>
      <PageTitle>Your Budgets</PageTitle>
      <Carousel>
        <BudgetCardList />
      </Carousel>
    </Container>
  );
};

export default Home;
