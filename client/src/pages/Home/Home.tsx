import React, { useEffect, useState } from "react";
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
import { getAllBudgets, createBudget } from "../../API/BudgetMethods";

const dummy = {
  month: "January",
  year: "2022",
  total: 3000,
  currentAmount: 500,
};

const Home = () => {
  const [budgets, setBudgets] = useState(null);
  const retrieveBudgets = async () => {
    const data = await getAllBudgets();
    setBudgets(data);
  };

  useEffect(() => {
    retrieveBudgets();
  }, []);

  return (
    <>
      <PageTitle>Your Budgets</PageTitle>
      {budgets == null ? (
        <div>Loading...</div>
      ) : (
        <Container>
          {BudgetData.map(({ month, year, spent, budget, active }) => (
            <BudgetMainContainer key={month} currentmonth={active}>
              <BudgetTitle>
                {month} <Soft>{year}</Soft>
              </BudgetTitle>

              <TotalBudgetBar>
                <ExpenseBar
                  percentage={Math.min((spent / budget) * 100, 100)}
                />
              </TotalBudgetBar>

              <BudgetInfoContainer>
                <BudgetInfo>
                  ${spent} of <Soft>${budget}</Soft>
                </BudgetInfo>
                <BudgetInfo>
                  {`${budget - spent < 0 ? "-" : ""}$${Math.abs(
                    budget - spent
                  )}`}{" "}
                  <Soft>{budget - spent > 0 ? "left" : "over"}</Soft>
                </BudgetInfo>
              </BudgetInfoContainer>

              <BudgetLinksContainer>
                <BudgetLink to="/budget/income" currentmonth={active}>
                  Adjust Incomes
                </BudgetLink>
                <BudgetLink to="/budget/expenses" currentmonth={active}>
                  Adjust Expenses
                </BudgetLink>
              </BudgetLinksContainer>
            </BudgetMainContainer>
          ))}
          <AddButton onClick={() => createBudget(dummy)}>
            <BsPlusSquare size="2.5rem" />
          </AddButton>
        </Container>
      )}
    </>
  );
};

export default Home;
