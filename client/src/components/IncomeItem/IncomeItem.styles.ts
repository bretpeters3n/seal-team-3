import styled from "styled-components";
import { motion } from "framer-motion";

interface ButtonProps {
  blueHover?: boolean;
}

export const Container = styled(motion.div)`
  display: flex;
`;

export const ItemContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
`;

export const ItemName = styled.h3`
  font-weight: 400;
`;

export const ItemAmount = styled.h3`
  color: green;
`;

export const ItemOptionsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1em;
  background-color: lightgray;
  padding: 0 1em;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

export const ItemOption = styled.button<ButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  transition: 0.2s ease all;

  &:hover {
    transform: scale(1.1);
    color: ${(props) => (props.blueHover ? "blue" : "red")};
  }
`;
