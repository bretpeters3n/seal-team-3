import React, { useEffect, useState } from "react";
import { Container, Carousel, GotoCurrent } from "./BudgetCardList.styles";
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
    <Container>
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

      <GotoCurrent onClick={() => setPosition(12)}>
        Goto Current <br /> Month&apos;s Budget
      </GotoCurrent>
    </Container>
  );
};

export default BudgetCardList;
