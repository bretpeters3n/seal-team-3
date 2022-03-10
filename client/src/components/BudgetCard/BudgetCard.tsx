import React from "react";
import {
  BudgetCardContainer,
  BudgetTitle,
  Soft,
  TotalBudgetBar,
  ExpenseBar,
  BudgetInfoContainer,
  BudgetInfo,
  BudgetLinksContainer,
  BudgetLink,
} from "./BudgetCard.styles";
import { IBudgetData } from "../../constants";

interface BudgetCardProps {
  budget: IBudgetData;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  budget: { _id, month, year, total, currentAmount, active },
}) => {
  return (
    <BudgetCardContainer currentmonth={active}>
      <BudgetTitle>
        {month} <Soft>{year}</Soft>
      </BudgetTitle>

      <TotalBudgetBar>
        <ExpenseBar percentage={Math.min((currentAmount / total) * 100, 100)} />
      </TotalBudgetBar>

      <BudgetInfoContainer>
        <BudgetInfo>
          ${currentAmount} of <Soft>${total}</Soft>
        </BudgetInfo>
        <BudgetInfo>
          {`${total - currentAmount < 0 ? "-" : ""}$${Math.abs(
            total - currentAmount
          )}`}
          <Soft>{total - currentAmount > 0 ? " left" : " over"}</Soft>
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
    </BudgetCardContainer>
  );
};

export default BudgetCard;
