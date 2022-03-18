import React from "react";
import {
  Container,
  TotalBudgetBar,
  ExpenseBar,
  BudgetInfoContainer,
  BudgetInfo,
  BudgetCardContainer,
  BudgetTitle,
  CategoryContainer,
  CategoryTitle,
  TransactionRow,
  TransactionTitle,
  TransactionAmount,
  CategoriesContainer,
} from "./BudgetMain.styles";
import { useOutletContext } from "react-router-dom";
import { ICategory } from "../../constants";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const BudgetMain: React.FC = () => {
  // I know this shouldn't be typed any...but I couldn't figure out how to type this along with the other useOutletContext ones
  const {
    data: { title, currentAmount, total, categories },
  } = useOutletContext<any>();

  return (
    <Container>
      <BudgetCardContainer>
        <BudgetTitle>{title}</BudgetTitle>
        <TotalBudgetBar>
          <ExpenseBar
            percentage={Math.min((currentAmount / total) * 100, 100)}
          />
        </TotalBudgetBar>
        <BudgetInfoContainer>
          <BudgetInfo>{`$${currentAmount} of $${total}`}</BudgetInfo>
          <BudgetInfo>
            {`${total - currentAmount < 0 ? "-" : ""}$${Math.abs(
              total - currentAmount
            )}`}
            {total - currentAmount > 0 ? " left" : " over"}
          </BudgetInfo>
        </BudgetInfoContainer>
      </BudgetCardContainer>
      <CategoriesContainer>
        {categories &&
          categories.map((category: ICategory) => (
            <CategoryContainer key={category._id}>
              <CategoryTitle>
                <h2>{category.title}</h2>
              </CategoryTitle>
              {category.transactions.length !== 0 ? (
                category.transactions.map((transaction) => (
                  <TransactionRow key={transaction._id}>
                    <TransactionTitle>{transaction.title}</TransactionTitle>
                    <TransactionAmount
                      textColor={transaction.amount > 0 ? "green" : "red"}
                    >
                      {currencyFormatter.format(transaction.amount)}
                    </TransactionAmount>
                  </TransactionRow>
                ))
              ) : (
                <TransactionRow>Add a transaction</TransactionRow>
              )}
            </CategoryContainer>
          ))}
      </CategoriesContainer>
    </Container>
  );
};

export default BudgetMain;
