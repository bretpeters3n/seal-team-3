import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

export const Carousel = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

export const UpArrow = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const DownArrow = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const GotoCurrent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  cursor: pointer;
  transition: 0.3s all ease;
  padding: 1em;

  &:hover {
    transform: scale(1.1);
  }
`;
