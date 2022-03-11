import React, { useEffect, useState } from "react";
import {
  Container,
  BudgetCardContainer,
  // ArrowOptions,
} from "./BudgetCardList.styles";
import { BudgetCard } from "../../components";
import { IBudgetData } from "../../constants";
import { getAllBudgets } from "../../API/BudgetMethods";
import { useSwipeable } from "react-swipeable";

const BudgetCardList: React.FC = () => {
  const [budgets, setBudgets] = useState<Array<IBudgetData>>([]);
  const [position, setPosition] = useState<number>(2);

  const onDown = () => {
    if (position < budgets.length - 1) {
      setPosition(position + 1);
    }
  };

  const onUp = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: () => onUp(),
    onSwipedDown: () => onDown(),
    trackMouse: true,
  });

  const retrieveAllBudgets = async () => {
    const data = await getAllBudgets();
    setBudgets(data);
  };

  useEffect(() => {
    retrieveAllBudgets();
  }, [position]);

  console.log(sessionStorage.getItem("authToken"));

  return (
    <Container {...handlers}>
      {budgets.length &&
        budgets.map((budget, index) => (
          <BudgetCardContainer
            key={budget._id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: index === position ? 1 : 0.8,
              rotate: 0,
              top: `${(index - position) * 20 + 25}vh`,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setPosition(index)}
          >
            <BudgetCard budget={budget} />
          </BudgetCardContainer>
        ))}
    </Container>
  );
};

export default BudgetCardList;
