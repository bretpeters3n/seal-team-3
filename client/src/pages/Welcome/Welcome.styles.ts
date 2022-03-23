import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  padding: 1em;
`;

export const Logo = styled.img`
  width: 250px;
`;

export const Description = styled.h2`
  text-align: center;
  font-weight: 400;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const Button = styled(Link)`
  padding: 0.5em 1em;
  font-size: 1.5rem;
  background: none;
  border-radius: 2em;
  border: 2px solid black;
  cursor: pointer;
  transition: 0.2s ease all;
  text-align: center;

  &:hover {
    background-color: black;
    color: white;
  }
`;
