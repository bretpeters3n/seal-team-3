import React, { useState } from "react";
import { Container } from "./Income.styles";
import { IncomeTracker, IncomeAdder } from "../../components";
import { AnimatePresence } from "framer-motion";
const Income = () => {
  const [displayAdder, setDisplayAdder] = useState<boolean>(false);

  return (
    <Container
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.35 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <IncomeTracker setDisplayAdder={setDisplayAdder} />
      <AnimatePresence>
        {displayAdder && <IncomeAdder setDisplayAdder={setDisplayAdder} />}
      </AnimatePresence>
    </Container>
  );
};

export default Income;
