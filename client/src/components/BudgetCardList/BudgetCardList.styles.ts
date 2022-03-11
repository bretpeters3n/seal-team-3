import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  position: relative;
  height: 70vh;
`;

export const BudgetCardContainer = styled(motion.div)`
  width: 100%;
  height: 20vh;
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
