import React, { useState, useEffect, createContext } from "react";
import { Container } from "./Transactions.styles";
import {
  TransactionItemAdder,
  TransactionItemEditor,
  TransactionItemsList,
} from "../../components";
import { AnimatePresence } from "framer-motion";
import { getAllItems } from "../../API/TransactionMethods";
import { ItemData } from "../../constants";

const PathContext = createContext<string>("");

interface Transaction {
  pageType: "income" | "expense";
}

const Transactions: React.FC<Transaction> = ({ pageType }) => {
  const [displayAdder, setDisplayAdder] = useState<boolean>(false);
  const [displayItemEditor, setDisplayItemEditor] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);

  const [incomeItems, setIncomeItems] = useState<Array<ItemData>>([]);
  const [expenseItems, setExpenseItems] = useState<Array<ItemData>>([]);

  const toggleRerender = () => setRerender(!rerender);
  const toggleItemEditor = () => setDisplayItemEditor(!displayItemEditor);

  const handleOnEdit = (id: string, title: string, amount: number) => {
    setDisplayAdder(false);
    setDisplayItemEditor(true);
  };

  const retrieveData = async () => {
    const expenseData = await getAllItems("expense");
    const incomeData = await getAllItems("income");

    setIncomeItems(incomeData);
    setExpenseItems(expenseData);
  };

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
        {displayItemEditor && (
          <TransactionItemEditor toggleItemEditor={toggleItemEditor} />
        )}
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
          filteredData={pageType === "income" ? incomeItems : expenseItems}
          toggleRerender={toggleRerender}
          pageType={pageType}
          handleOnEdit={handleOnEdit}
        />
      </Container>
    </PathContext.Provider>
  );
};

export default Transactions;
