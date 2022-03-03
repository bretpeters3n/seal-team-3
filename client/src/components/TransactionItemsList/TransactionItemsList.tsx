import React from "react";
import TransactionItem from "../TransactionItem/TransactionItem";
import { BsPlusCircle } from "react-icons/bs";
import {
  Container,
  IncomeContainer,
  TitleContainer,
  Title,
  Button,
} from "./TransactionItemsList.styles";
import { AnimatePresence } from "framer-motion";
import { ItemData, TransactionType } from "../../constants";

interface ItemListProps {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  filteredData: ItemData[];
  toggleRerender: () => void;
  pageType: TransactionType;
}

const IncomeTracker: React.FC<ItemListProps> = ({
  setDisplayAdder,
  filteredData,
  toggleRerender,
  pageType,
}) => {
  return (
    <Container>
      <IncomeContainer>
        <TitleContainer>
          <Title>
            Monthly {`${pageType.includes("expense") ? "Expense" : "Income"}`}
          </Title>
          <Button onClick={() => setDisplayAdder(true)}>
            <BsPlusCircle size="2rem" />
          </Button>
        </TitleContainer>
        <AnimatePresence>
          {filteredData?.map((item) => (
            <TransactionItem
              key={item._id}
              id={item._id}
              title={item.title}
              amount={item.amount}
              toggleRerender={toggleRerender}
              pageType={pageType}
            />
          ))}
        </AnimatePresence>
      </IncomeContainer>
    </Container>
  );
};

export default IncomeTracker;
