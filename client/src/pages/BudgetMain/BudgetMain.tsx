import React, { useState } from "react";
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
  PercentageDisplay,
  BudgetTitleContainer,
  BudgetEditorButton,
  BudgetLinksContainer,
  BudgetLink,
  BudgetButton,
  ButtonStyles,
} from "./BudgetMain.styles";
import { useOutletContext } from "react-router-dom";
import { ICategory } from "../../constants";
import { BudgetEditor } from "../../components";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const BudgetMain: React.FC = () => {
  // I know this shouldn't be typed any...but I couldn't figure out how to type this along with the other useOutletContext ones
  const {
    data: { _id, title, currentAmount, total, categories },
    doRefetch,
  } = useOutletContext<any>();
  const [displayBudgetEditor, setDisplayBudgetEditor] =
    useState<boolean>(false);

  return (
    <Container
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 500 }}
      transition={{ duration: 0.5 }}
    >
      <BudgetCardContainer>
        <BudgetTitleContainer>
          <BudgetTitle>{title}</BudgetTitle>
          <BudgetEditorButton onClick={() => setDisplayBudgetEditor(true)}>
            Edit Budget
          </BudgetEditorButton>
        </BudgetTitleContainer>
        <TotalBudgetBar>
          <ExpenseBar
            percentage={Math.min((currentAmount / total) * 100, 100)}
          />
          <PercentageDisplay>{`${((currentAmount / total) * 100).toFixed(
            2
          )}%`}</PercentageDisplay>
        </TotalBudgetBar>
        <BudgetInfoContainer>
          <BudgetInfo>{`${currencyFormatter.format(
            currentAmount
          )} of ${currencyFormatter.format(total)}`}</BudgetInfo>
          <BudgetInfo>
            {`${total - currentAmount < 0 ? "-" : ""}$${Math.abs(
              total - currentAmount
            )}`}
            {total - currentAmount >= 0 ? " left" : " over"}
          </BudgetInfo>
        </BudgetInfoContainer>
      </BudgetCardContainer>
      <BudgetLinksContainer>
        <BudgetButton sx={ButtonStyles} variant="contained">
          <BudgetLink to="income">Adjust Incomes</BudgetLink>
        </BudgetButton>
        <BudgetButton sx={ButtonStyles} variant="contained">
          <BudgetLink to="expenses">Adjust Expenses</BudgetLink>
        </BudgetButton>
      </BudgetLinksContainer>
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
      {displayBudgetEditor && (
        <BudgetEditor
          title={title}
          setDisplayBudgetEditor={setDisplayBudgetEditor}
          currentBudget={total}
          currentAmount={currentAmount}
          doRefetch={doRefetch}
          budgetId={_id}
        />
      )}
    </Container>
  );
};

export default BudgetMain;
