import React, { useState } from "react";
import {
  BudgetCardContainer,
  BudgetTitle,
  TotalBudgetBar,
  ExpenseBar,
  BudgetInfoContainer,
  BudgetInfo,
  CreateBudgetButton,
  NoBudgetMessage,
  PercentageDisplay,
} from "./BudgetCard.styles";
import { IBudgetData } from "../../constants";
import { BsPlusSquare } from "react-icons/bs";
import { BudgetAdder } from "../../components";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "../../utils/CurrencyFormat";

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
  const BudgetCardAnimation = {
    scale: index === position ? 1 : 0.8,
    rotate: 0,
    top: `${(index - position) * 20 + 23}vh`,
  };
  return (
    <BudgetCardContainer
      initial={{ scale: 0, rotate: -180 }}
      animate={BudgetCardAnimation}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      $current={index === position}
      onClick={() =>
        created && position === index
          ? navigate(`/budget/${_id}`, {
              state: { id: _id, title, total, currentAmount, categories },
            })
          : setPosition(index)
      }
    >
      <BudgetTitle>{title}</BudgetTitle>

      {created ? (
        <>
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
              {`${
                total - currentAmount < 0 ? "-" : ""
              }${currencyFormatter.format(Math.abs(total - currentAmount))}`}
              {total - currentAmount > 0 ? " left" : " over"}
            </BudgetInfo>
          </BudgetInfoContainer>
        </>
      ) : (
        <NoBudgetMessage>
          <h4>Please create a new budget</h4>
        </NoBudgetMessage>
      )}

      <CreateBudgetButton
        active={created}
        onClick={() => {
          position === index && setDisplayBudgetAdder(true);
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
