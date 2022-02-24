import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

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
  justify-content: space-between;
  list-style: none;
`;

export const ListItem = styled(motion.a)`
  text-transform: uppercase;
  font-weight: 700;
  color: gray;

  &:hover {
    cursor: pointer;
  }

  &.selected {
    box-sizing: border-box;
    border-bottom: 1px solid black;
    color: black;
  }
`;
