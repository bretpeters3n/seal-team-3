import React, { useState, useEffect, createContext } from "react";
import { Container, GotoBudgetButton } from "./Transactions.styles";
import { TransactionItemAdder, TransactionItemsList } from "../../components";
import { AnimatePresence } from "framer-motion";
import { getAllItems } from "../../API/TransactionMethods";
import { ITransaction } from "../../constants";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
const PathContext = createContext<string>("");
interface Transaction {
  pageType: "income" | "expense";
}
const Transactions: React.FC<Transaction> = ({ pageType }) => {
  const [displayAdder, setDisplayAdder] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);
  const { budgetId } = useParams();
  const fetchTransactions = async () => {
    const transactions = await getAllItems(budgetId);
    return transactions;
  };
  const { data, isLoading, status, refetch } = useQuery(
    "transactions",
    fetchTransactions
  );
  const toggleRerender = () => setRerender(!rerender);
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, [rerender]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error...</div>;
  }
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
          filteredData={data.filter(
            (transaction: ITransaction) => transaction.type === pageType
          )}
          toggleRerender={toggleRerender}
          pageType={pageType}
          displayAdder={displayAdder}
        />
        <GotoBudgetButton onClick={() => navigate(`/budget/${budgetId}`)}>
          Back to Budget
        </GotoBudgetButton>
      </Container>
    </PathContext.Provider>
  );
};
export default Transactions;
