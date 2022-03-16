import React, { useState } from "react";
import {
  BudgetCardContainer,
  BudgetTitle,
  TotalBudgetBar,
  ExpenseBar,
  BudgetInfoContainer,
  BudgetInfo,
  BudgetLinksContainer,
  BudgetLink,
  CreateBudgetButton,
  NoBudgetMessage,
} from "./BudgetCard.styles";
import { IBudgetData } from "../../constants";
import { BsPlusSquare } from "react-icons/bs";
import { BudgetAdder } from "../../components";
import { useNavigate } from "react-router-dom";

interface IBudgetCard {
  budget: IBudgetData;
  index: number;
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  toggleRerender: () => void;
}

const BudgetCard: React.FC<IBudgetCard> = ({
  budget: { _id, title, total, currentAmount, created, categories },
  index,
  position,
  setPosition,
  toggleRerender,
}) => {
  const [displayBudgetAdder, setDisplayBudgetAdder] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <BudgetCardContainer
      initial={{ scale: 0, rotate: -180 }}
      animate={{
        scale: index === position ? 1 : 0.8,
        rotate: 0,
        top: `${(index - position) * 15 + 26}vh`,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      $current={index === position}
      onClick={() =>
        created &&
        navigate(`/budget/${_id}`, {
          state: { id: _id, title, total, currentAmount, categories },
        })
      }
    >
      <BudgetTitle>{title}</BudgetTitle>

      {created ? (
        <>
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

          <BudgetLinksContainer active={created}>
            <BudgetLink to="/budget/income">Adjust Incomes</BudgetLink>
            <BudgetLink to="/budget/expenses">Adjust Expenses</BudgetLink>
          </BudgetLinksContainer>
        </>
      ) : (
        <NoBudgetMessage>
          <h4>Please create a new budget</h4>
        </NoBudgetMessage>
      )}

      <CreateBudgetButton
        active={created}
        onClick={() => {
          setDisplayBudgetAdder(true);
        }}
      >
        <BsPlusSquare size="2.5rem" />
      </CreateBudgetButton>

      {displayBudgetAdder && (
        <BudgetAdder
          title={title}
          currentAmount={currentAmount}
          setDisplayBudgetAdder={setDisplayBudgetAdder}
          toggleRerender={toggleRerender}
        />
      )}
    </BudgetCardContainer>
  );
};

export default BudgetCard;
