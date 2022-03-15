import React, { useEffect, useState } from "react";
import {
  Container,
  Carousel,
  UpArrow,
  DownArrow,
  GotoCurrent,
} from "./BudgetCardList.styles";
import { BudgetCard } from "../../components";
import { IBudgetData } from "../../constants";
import { getAllBudgets } from "../../API/BudgetMethods";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const BudgetCardList: React.FC = () => {
  const [budgets, setBudgets] = useState<Array<IBudgetData>>([]);
  const [position, setPosition] = useState<number>(12);
  const [rerender, setRerender] = useState<boolean>(true);

  const toggleRerender = () => setRerender(!rerender);

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

  const retrieveAllBudgets = async () => {
    const data = await getAllBudgets();
    setBudgets(data);
  };

  useEffect(() => {
    retrieveAllBudgets();
  }, [rerender]);
  console.log(budgets);

  return (
    <Container>
      <UpArrow onClick={onUp}>
        <IoIosArrowUp size="3rem" />
      </UpArrow>

      <Carousel>
        {budgets.map((budget, index) => (
          <BudgetCard
            key={index}
            budget={budget}
            index={index}
            position={position}
            setPosition={setPosition}
            toggleRerender={toggleRerender}
          />
        ))}
      </Carousel>
      <DownArrow onClick={onDown}>
        <IoIosArrowDown size="3rem" />
      </DownArrow>
      <GotoCurrent onClick={() => setPosition(12)}>Goto Current</GotoCurrent>
    </Container>
  );
};

export default BudgetCardList;
