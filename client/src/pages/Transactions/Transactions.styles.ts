import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  width: 100vw;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  margin-top: 3em;
`;

export const GotoBudgetButton = styled.a`
  position: absolute;
  top: -30px;
  left: 20px;
  cursor: pointer;
  transition: 0.2s all ease;
  font-weight: 800;
  color: #3200c0;
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }
`;
