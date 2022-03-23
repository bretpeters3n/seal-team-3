import React, { useState, useEffect, createContext } from "react";
import {
  Container,
  GotoBudgetButton,
  IncomeMessage,
} from "./Transactions.styles";
import { TransactionItemAdder, TransactionItemsList } from "../../components";
import { AnimatePresence } from "framer-motion";
import { ICategory } from "../../constants";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
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

  const {
    data: { currentAmount, categories },
    refetch,
  } = useOutletContext<any>();

  const allIncomeTransactions = categories
    ?.filter(
      (category: ICategory) =>
        category?.transactions?.length !== 0 && category.title === "Income"
    )
    .map((item: any) => item.transactions);

  const allExpenseTransactions = categories
    ?.filter(
      (category: ICategory) =>
        category?.transactions?.length !== 0 && category.title !== "Income"
    )
    .map((item: any) => item.transactions);

  const toggleRerender = () => setRerender(!rerender);

  useEffect(() => {
    refetch();
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
              refetchBudget={refetch}
            />
          )}
        </AnimatePresence>
        <TransactionItemsList
          setDisplayAdder={setDisplayAdder}
          filteredData={
            pageType === "income"
              ? allIncomeTransactions.flat()
              : allExpenseTransactions.flat()
          }
          toggleRerender={toggleRerender}
          pageType={pageType}
          displayAdder={displayAdder}
          currentAmount={currentAmount}
          refetchBudget={refetch}
        />
        <GotoBudgetButton
          onClick={() => {
            navigate(`/budget/${budgetId}`);
            refetch();
          }}
        >
          <MdKeyboardArrowLeft size="2rem" /> Back to Budget
        </GotoBudgetButton>
        {pageType === "income" && (
          <IncomeMessage>
            <p>*Income transactions will NOT affect the budget.*</p>
          </IncomeMessage>
        )}
      </Container>
    </PathContext.Provider>
  );
};
export default Transactions;
