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

interface ITransactionItemsList {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  filteredData: ItemData[];
  toggleRerender: () => void;
  pageType: TransactionType;
  budgetData: any;
}

const TransactionItemsList: React.FC<ITransactionItemsList> = ({
  setDisplayAdder,
  filteredData,
  toggleRerender,
  pageType,
  budgetData,
}) => {
  console.log(filteredData);
  return (
    <Container>
      <TransactionsContainer>
        <TitleContainer>
          <Title>{budgetData.title} Transactions</Title>
          <Button onClick={() => setDisplayAdder(true)}>
            <BsPlusCircle size="2rem" />
          </Button>
        </TitleContainer>
        <AnimatePresence>
          {filteredData?.map((item) => (
            <TransactionItem
              key={item._id}
              itemId={item._id}
              title={item.title}
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
