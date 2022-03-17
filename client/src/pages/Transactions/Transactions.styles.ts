import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  width: 100vw;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

export const GotoBudgetButton = styled.a`
  position: absolute;
  bottom: -25px;
  left: 20px;
  cursor: pointer;
  transition: 0.2s all ease;

  &:hover {
    transform: scale(1.05);
  }
`;
