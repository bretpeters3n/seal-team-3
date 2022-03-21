import React, { useState, useEffect, createContext } from "react";
import {
  Container,
  GotoBudgetButton,
  IncomeMessage,
} from "./Transactions.styles";
import { TransactionItemAdder, TransactionItemsList } from "../../components";
import { AnimatePresence } from "framer-motion";
import { getAllItems } from "../../API/TransactionMethods";
import { ITransaction } from "../../constants";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { MdKeyboardArrowLeft } from "react-icons/md";

const PathContext = createContext<string>("");
interface Transaction {
  pageType: "income" | "expense";
}
const Transactions: React.FC<Transaction> = ({ pageType }) => {
  const [displayAdder, setDisplayAdder] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);
  const { budgetId } = useParams();
  const navigate = useNavigate();
  const fetchTransactions = async () => {
    const transactions = await getAllItems(budgetId, navigate);
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
  useEffect(() => {
    doRefetch();
    refetch();
  }, [rerender]);
  if (isLoading) {
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );
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
          doRefetch={doRefetch}
        />
        <GotoBudgetButton
          onClick={() => {
            navigate(`/budget/${budgetId}`);
            doRefetch();
          }}
        >
          <MdKeyboardArrowLeft size="2rem" /> Back to Budget
        </GotoBudgetButton>
        {pageType === "income" && (
          <IncomeMessage>
            <p>**Income transactions will not affect the budget.**</p>
          </IncomeMessage>
        )}
      </Container>
    </PathContext.Provider>
  );
};
export default Transactions;
