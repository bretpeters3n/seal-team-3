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
        {BudgetData.map(({ month, year, spent, budget, active }) => (
          <BudgetMainContainer key={month} currentMonth={active}>
            <BudgetTitle>
              {month} <Soft>{year}</Soft>
            </BudgetTitle>

            <TotalBudgetBar>
              <ExpenseBar percentage={Math.min((spent / budget) * 100, 100)} />
            </TotalBudgetBar>

            <BudgetInfoContainer>
              <BudgetInfo>
                ${spent} of <Soft>${budget}</Soft>
              </BudgetInfo>
              <BudgetInfo>
                {`${budget - spent < 0 ? "-" : ""}$${Math.abs(budget - spent)}`}{" "}
                <Soft>{budget - spent > 0 ? "left" : "over"}</Soft>
              </BudgetInfo>
            </BudgetInfoContainer>

            <BudgetLinksContainer>
              <BudgetLink to="/budget/income" currentMonth={active}>
                Adjust Incomes
              </BudgetLink>
              <BudgetLink to="/budget/expenses" currentMonth={active}>
                Adjust Expenses
              </BudgetLink>
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
