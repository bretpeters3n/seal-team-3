import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  user-select: none;
  margin-top: 2em;
`;

export const Carousel = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

export const GotoCurrent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  transition: 0.3s all ease;
  padding: 1em;
  text-align: center;

  &:hover {
    transform: scale(1.1);
  }
`;
