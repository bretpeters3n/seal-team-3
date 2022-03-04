import React, { useState, useEffect, createContext } from "react";
import { Container } from "./Transactions.styles";
import { TransactionItemAdder, TransactionItemsList } from "../../components";
import { AnimatePresence } from "framer-motion";
import { getAllItems } from "../../API/TransactionMethods";
import { ItemData } from "../../constants";

const PathContext = createContext<string>("");

interface Transaction {
  pageType: "income" | "expense";
}

const Transactions: React.FC<Transaction> = ({ pageType }) => {
  const [displayAdder, setDisplayAdder] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);
  const [filteredIncomeItems, setFilteredIncomeItems] = useState<
    Array<ItemData>
  >([]);
  const [filteredExpenseItems, setFilteredExpenseItems] = useState<
    Array<ItemData>
  >([]);

  const toggleRerender = () => setRerender(!rerender);

  useEffect(() => {
    retrieveData();
  }, [rerender]);

  const retrieveData = async () => {
    const data = await getAllItems(pageType);

    pageType === "income"
      ? setFilteredIncomeItems(data)
      : setFilteredExpenseItems(data);
  };

  return (
    <PathContext.Provider value={pageType}>
      <Container
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.35 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <AnimatePresence>
          {displayAdder && (
            <TransactionItemAdder
              setDisplayAdder={setDisplayAdder}
              toggleRerender={toggleRerender}
            />
          )}
        </AnimatePresence>
        <TransactionItemsList
          setDisplayAdder={setDisplayAdder}
          filteredData={
            pageType === "income" ? filteredIncomeItems : filteredExpenseItems
          }
          toggleRerender={toggleRerender}
          pageType={pageType}
        />
      </Container>
    </PathContext.Provider>
  );
};

export default Transactions;
