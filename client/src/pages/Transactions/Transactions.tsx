import React, { useState, useEffect, createContext } from "react";
import { Container, GotoBudgetButton } from "./Transactions.styles";
import { TransactionItemAdder, TransactionItemsList } from "../../components";
import { AnimatePresence } from "framer-motion";
import { getAllItems } from "../../API/TransactionMethods";
import { ITransaction } from "../../constants";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

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

  const {
    data: { currentAmount },
    doRefetch,
  } = useOutletContext<any>();

  const { data, isLoading, isError, refetch } = useQuery(
    "transactions",
    fetchTransactions
  );
  const toggleRerender = () => setRerender(!rerender);
  const navigate = useNavigate();
  useEffect(() => {
    doRefetch();
    refetch();
  }, [rerender]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
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
              doRefetch={doRefetch}
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
          currentAmount={currentAmount}
        />
        <GotoBudgetButton onClick={() => navigate(`/budget/${budgetId}`)}>
          <MdOutlineArrowBackIosNew />
          Back to Budget
        </GotoBudgetButton>
      </Container>
    </PathContext.Provider>
  );
};
export default Transactions;
