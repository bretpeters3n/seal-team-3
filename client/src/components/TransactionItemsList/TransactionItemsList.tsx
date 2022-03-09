import React from "react";
import TransactionItem from "../TransactionItem/TransactionItem";
import { BsPlusCircle } from "react-icons/bs";
import {
  Container,
  TransactionsContainer,
  TitleContainer,
  Title,
  Button,
} from "./TransactionItemsList.styles";
import { AnimatePresence } from "framer-motion";
import { ItemData, TransactionType } from "../../constants";

interface TransactionTracker {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  filteredData: ItemData[];
  toggleRerender: () => void;
  pageType: TransactionType;
  handleOnEdit: (id: string, name: string, amount: number) => void;
}

const TransactionItemsList: React.FC<TransactionTracker> = ({
  setDisplayAdder,
  filteredData,
  toggleRerender,
  pageType,
  handleOnEdit,
}) => {
  return (
    <Container>
      <TransactionsContainer>
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
              handleOnEdit={handleOnEdit}
            />
          ))}
        </AnimatePresence>
      </TransactionsContainer>
    </Container>
  );
};

export default TransactionItemsList;
