import React, { useState, useEffect, createContext } from "react";
import { Container } from "./Transactions.styles";
import { TransactionItemAdder, TransactionItemsList } from "../../components";
import { AnimatePresence } from "framer-motion";
import { getAllItems } from "../../API/TransactionMethods";
import { ItemData } from "../../constants";
import { useParams, useOutletContext } from "react-router-dom";

const PathContext = createContext<string>("");

interface Transaction {
  pageType: "income" | "expense";
}

const Transactions: React.FC<Transaction> = ({ pageType }) => {
  const [displayAdder, setDisplayAdder] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);
  const [transactionItems, setTransactionItems] = useState<Array<ItemData>>([]);

  const { budgetId } = useParams();

  const toggleRerender = () => setRerender(!rerender);

  const retrieveData = async () => {
    const transactions = await getAllItems(budgetId);

    setTransactionItems(transactions);
  };

  const budgetData = useOutletContext<any>();

  useEffect(() => {
    retrieveData();
  }, [rerender]);

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
              pageType={pageType}
            />
          )}
        </AnimatePresence>
        <TransactionItemsList
          setDisplayAdder={setDisplayAdder}
          filteredData={transactionItems.filter(
            (transaction) => transaction.type === pageType
          )}
          toggleRerender={toggleRerender}
          pageType={pageType}
          budgetData={budgetData}
        />
      </Container>
    </PathContext.Provider>
  );
};

export default Transactions;
