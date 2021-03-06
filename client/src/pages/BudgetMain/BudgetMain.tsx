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
  BackButton,
  BackButtonContainer,
} from "./BudgetMain.styles";
import { useOutletContext } from "react-router-dom";
import { ICategory } from "../../constants";
import { BudgetEditor } from "../../components";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { currencyFormatter } from "../../utils/CurrencyFormat";

const BudgetMain: React.FC = () => {
  // I know this shouldn't be typed any...but I couldn't figure out how to type this along with the other useOutletContext ones
  const {
    data: { _id, title, currentAmount, total, categories },
    refetch,
  } = useOutletContext<any>();
  const [displayBudgetEditor, setDisplayBudgetEditor] =
    useState<boolean>(false);

  return (
    <Container
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 500 }}
      transition={{ duration: 0.5 }}
    >
      <BackButtonContainer>
        <BackButton to="/">
          <MdKeyboardArrowLeft size="2rem" />
          Back to Budgets
        </BackButton>
      </BackButtonContainer>
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
            0
          )}%`}</PercentageDisplay>
        </TotalBudgetBar>
        <BudgetInfoContainer>
          <BudgetInfo>{`${currencyFormatter.format(
            currentAmount
          )} of ${currencyFormatter.format(total)}`}</BudgetInfo>
          <BudgetInfo>
            {`${total - currentAmount < 0 ? "-" : ""}${currencyFormatter.format(
              Math.abs(total - currentAmount)
            )}`}
            {total - currentAmount >= 0 ? " left" : " over"}
          </BudgetInfo>
        </BudgetInfoContainer>
      </BudgetCardContainer>
      <BudgetLinksContainer>
        <BudgetButton sx={ButtonStyles} variant="contained">
          <BudgetLink to="income">Incomes +/-</BudgetLink>
        </BudgetButton>
        <BudgetButton sx={ButtonStyles} variant="contained">
          <BudgetLink to="expenses">Expenses +/-</BudgetLink>
        </BudgetButton>
      </BudgetLinksContainer>
      <CategoriesContainer>
        {categories &&
          categories.map(
            (category: ICategory) =>
              category.transactions.length !== 0 && (
                <CategoryContainer key={category._id}>
                  <CategoryTitle>
                    <h2>{category.title}</h2>
                  </CategoryTitle>
                  {category.transactions.length !== 0 &&
                    category.transactions.map((transaction) => (
                      <TransactionRow key={transaction._id}>
                        <TransactionTitle>{transaction.title}</TransactionTitle>
                        <TransactionAmount
                          textColor={transaction.amount > 0 ? "green" : "red"}
                        >
                          {currencyFormatter.format(transaction.amount)}
                        </TransactionAmount>
                      </TransactionRow>
                    ))}
                </CategoryContainer>
              )
          )}
      </CategoriesContainer>
      {displayBudgetEditor && (
        <BudgetEditor
          title={title}
          setDisplayBudgetEditor={setDisplayBudgetEditor}
          currentBudget={total}
          currentAmount={currentAmount}
          refetchBudget={refetch}
          budgetId={_id}
        />
      )}
    </Container>
  );
};

export default BudgetMain;
