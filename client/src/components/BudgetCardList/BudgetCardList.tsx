import React, { useEffect, useState } from "react";
import {
  Container,
  Carousel,
  UpArrow,
  DownArrow,
  GotoCurrent,
} from "./BudgetCardList.styles";
import { BudgetCard } from "../../components";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IBudgetData } from "../../constants";

interface IBudgetCardList {
  budgets: IBudgetData[];
  refetch: () => void;
}

const BudgetCardList: React.FC<IBudgetCardList> = ({ budgets, refetch }) => {
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

  useEffect(() => {
    refetch();
  }, [rerender]);

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
