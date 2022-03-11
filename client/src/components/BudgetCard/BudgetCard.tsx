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

interface IBudgetCard {
  budget: IBudgetData;
  index: number;
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

const BudgetCard: React.FC<IBudgetCard> = ({
  budget: { _id, month, year, total, currentAmount, active },
  index,
  position,
  setPosition,
}) => {
  return (
    <BudgetCardContainer
      currentmonth={_id === "622b99db73a322920a89f756" ? true : active}
      initial={{ scale: 0, rotate: -180 }}
      animate={{
        scale: index === position ? 1 : 0.8,
        rotate: 0,
        top: `${(index - position) * 20 + 25}vh`,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={() => setPosition(index)}
    >
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
