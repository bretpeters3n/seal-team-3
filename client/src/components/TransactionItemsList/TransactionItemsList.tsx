import React from "react";
import TransactionItem from "../TransactionItem/TransactionItem";
import { BsPlusCircle } from "react-icons/bs";
import {
  Container,
  TransactionsContainer,
  TitleContainer,
  Title,
  Button,
  NoTransactionsMessage,
} from "./TransactionItemsList.styles";
import { AnimatePresence } from "framer-motion";
import { ItemData, TransactionType } from "../../constants";

interface ITransactionItemsList {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  filteredData: ItemData[];
  toggleRerender: () => void;
  pageType: TransactionType;
  displayAdder: boolean;
  currentAmount: number;
}

const TransactionItemsList: React.FC<ITransactionItemsList> = ({
  setDisplayAdder,
  filteredData,
  toggleRerender,
  pageType,
  displayAdder,
  currentAmount,
}) => {
  return (
    <Container>
      <TransactionsContainer
        maxHeight={displayAdder ? "calc(100vh - 450px)" : "calc(100vh-70px)"}
      >
        <TitleContainer>
          <Title>{pageType === "expense" ? "Expenses" : "Income"}</Title>
          <Button onClick={() => setDisplayAdder(true)}>
            <BsPlusCircle size="2rem" />
          </Button>
        </TitleContainer>
        <AnimatePresence>
          {filteredData.length < 1 && (
            <NoTransactionsMessage>
              <h2>No transactions yet</h2>
            </NoTransactionsMessage>
          )}
          {filteredData?.map((item) => (
            <TransactionItem
              key={item._id}
              itemId={item._id}
              transactionTitle={item.title}
              categoryId={item.category_id}
              amount={item.amount}
              toggleRerender={toggleRerender}
              pageType={pageType}
            />
          ))}
        </AnimatePresence>
      </TransactionsContainer>
    </Container>
  );
};

export default TransactionItemsList;
