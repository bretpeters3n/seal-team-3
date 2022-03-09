import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export const Container = styled(motion.div)`
  width: 100vw;
  max-width: 600px;
  margin: 0 auto;
  padding: 1em;
`;

export const List = styled(motion.ul)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  list-style: none;
`;

export const ListItem = styled.a`
  text-transform: uppercase;
  font-weight: 700;
  transition: 0.2s ease all;

  &:hover {
    cursor: pointer;
  }

  &.selected {
    box-sizing: border-box;
    border-bottom: 1px solid black;
    transform: scale(1.1);
  }
`;

export const ListItemText = styled(NavLink)`
  color: gray;

  transition: 0.2s all ease;
  &.active {
    border-bottom: 1px solid black;
    font-size: 1.1rem;
    color: black;
  }
`;
