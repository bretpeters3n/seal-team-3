import React from "react";
import { IncomeItem } from "../../components";
import { BsPlusCircle } from "react-icons/bs";
import {
  Container,
  IncomeContainer,
  TitleContainer,
  Title,
  Button,
} from "./IncomeTracker.styles";
import { AnimatePresence } from "framer-motion";
import { IncomeData } from "../../pages/Income/Income";

interface IncomeTrackerProps {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  filteredIncomeData: IncomeData[];
  toggleChange: () => void;
}

const IncomeTracker: React.FC<IncomeTrackerProps> = ({
  setDisplayAdder,
  filteredIncomeData,
  toggleChange,
}) => {
  return (
    <Container>
      <IncomeContainer>
        <TitleContainer>
          <Title>Monthly Income</Title>
          <Button onClick={() => setDisplayAdder(true)}>
            <BsPlusCircle size="2rem" />
          </Button>
        </TitleContainer>
        <AnimatePresence>
          {filteredIncomeData?.map((item) => (
            <IncomeItem
              key={item._id}
              id={item._id}
              title={item.title}
              amount={item.amount}
              toggleChange={toggleChange}
            />
          ))}
        </AnimatePresence>
      </IncomeContainer>
    </Container>
  );
};

export default IncomeTracker;
