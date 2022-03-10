import React from "react";
import {
  BudgetMainContainer,
  BudgetTitle,
  Container,
  ExpenseBar,
  TotalBudgetBar,
  Soft,
  BudgetInfoContainer,
  BudgetInfo,
  BudgetLinksContainer,
  BudgetLink,
  PageTitle,
  AddButton,
} from "./Home.styles";

import { BudgetData } from "../../dummydata";
import { BsPlusSquare } from "react-icons/bs";

const Home = () => {
  return (
    <>
      <PageTitle>Your Budgets</PageTitle>
      <Container>
        {BudgetData.map((budget) => (
          <BudgetMainContainer key={budget.month}>
            <BudgetTitle>
              {budget.month} <Soft>{budget.year}</Soft>
            </BudgetTitle>

            <TotalBudgetBar>
              <ExpenseBar percentage={(budget.spent / budget.budget) * 100} />
            </TotalBudgetBar>

            <BudgetInfoContainer>
              <BudgetInfo>
                ${budget.spent} of <Soft>${budget.budget}</Soft>
              </BudgetInfo>
              <BudgetInfo>
                {`${budget.budget - budget.spent < 0 ? "-" : ""}$${Math.abs(
                  budget.budget - budget.spent
                )}`}{" "}
                <Soft>
                  {budget.budget - budget.spent > 0 ? "left" : "over"}
                </Soft>
              </BudgetInfo>
            </BudgetInfoContainer>

            <BudgetLinksContainer>
              <BudgetLink to="/budget/income">Adjust Incomes</BudgetLink>
              <BudgetLink to="/budget/expenses">Adjust Expenses</BudgetLink>
            </BudgetLinksContainer>
          </BudgetMainContainer>
        ))}
        <AddButton>
          <BsPlusSquare size="2.5rem" />
        </AddButton>
      </Container>
    </>
  );
};

export default Home;
