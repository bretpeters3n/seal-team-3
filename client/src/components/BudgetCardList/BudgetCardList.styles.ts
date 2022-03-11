import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  position: relative;
  height: 100%;
  outline: 1px solid red;
`;

export const BudgetCardContainer = styled(motion.div)`
  width: 100%;
  height: 25%;
  overflow: hidden;
  background: white;
  position: absolute;
  cursor: pointer;
`;

export const ArrowOptions = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 2em;
  z-index: 3;
  padding: 0.5em;
`;
