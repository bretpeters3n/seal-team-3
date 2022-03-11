import React, { useEffect, useState } from "react";
import {
  Container,
  Carousel,
  ArrowOptions,
  Arrow,
} from "./BudgetCardList.styles";
import { BudgetCard } from "../../components";
import { IBudgetData } from "../../constants";
import { getAllBudgets } from "../../API/BudgetMethods";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

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

  const retrieveAllBudgets = async () => {
    const data = await getAllBudgets();
    setBudgets(data);
  };

  useEffect(() => {
    retrieveAllBudgets();
  }, []);

  console.log(sessionStorage.getItem("authToken"));

  return (
    <Container>
      <ArrowOptions>
        <Arrow onClick={onUp}>
          <IoIosArrowUp size="3rem" />
        </Arrow>
        <Arrow onClick={onDown}>
          <IoIosArrowDown size="3rem" />
        </Arrow>
      </ArrowOptions>
      <Carousel>
        {budgets.map((budget, index) => (
          <BudgetCard
            key={budget._id}
            budget={budget}
            index={index}
            position={position}
            setPosition={setPosition}
          />
        ))}
      </Carousel>
    </Container>
  );
};

export default BudgetCardList;
