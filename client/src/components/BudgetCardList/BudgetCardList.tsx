import React, { useEffect, useState } from "react";
import {
  CarouselContainer,
  Carousel,
  CurrentButton,
  MainContainer,
} from "./BudgetCardList.styles";
import { BudgetCard } from "../../components";

import { IBudgetData } from "../../constants";

interface IBudgetCardList {
  budgets: IBudgetData[];
  refetch: () => void;
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

const BudgetCardList: React.FC<IBudgetCardList> = ({
  budgets,
  refetch,
  position,
  setPosition,
}) => {
  const [rerender, setRerender] = useState<boolean>(true);

  const toggleRerender = () => setRerender(!rerender);

  useEffect(() => {
    refetch();
  }, [rerender]);

  return (
    <MainContainer>
      <CurrentButton onClick={() => setPosition(12)}>
        Go to Current Month
      </CurrentButton>
      <CarouselContainer>
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
      </CarouselContainer>
    </MainContainer>
  );
};

export default BudgetCardList;
