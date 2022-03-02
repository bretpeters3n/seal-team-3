import React, { useState } from "react";
import { Container } from "./Expenses.styles";

import { ExpenseTracker, ExpenseAdder } from "../../components";
import { AnimatePresence } from "framer-motion";
const Expenses = () => {
  const [displayAdder, setDisplayAdder] = useState<boolean>(false);

  return (
    <Container
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.35 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <ExpenseTracker setDisplayAdder={setDisplayAdder} />
      <AnimatePresence>
        {displayAdder && <ExpenseAdder setDisplayAdder={setDisplayAdder} />}
      </AnimatePresence>
    </Container>
  );
};
export default Expenses;
