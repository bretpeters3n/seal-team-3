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

export const ArrowOptions = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Arrow = styled.div`
  margin: 0 auto;
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    transform: scale(1.1);
  }
`;
