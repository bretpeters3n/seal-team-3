import styled from "styled-components";
import { motion } from "framer-motion";
import { device } from "../../utils/Breakpoints";

export const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  position: relative;
  display: flex;
  align-items: center;
`;

export const CarouselContainer = styled.div`
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

export const CurrentButton = styled.div`
  border-radius: 20px;
  font-size: 0.7rem;
  border: 2px solid #3200c0;
  color: #3200c0;
  position: absolute;
  top: 80px;
  right: 5px;
  cursor: pointer;
  transition: 0.3s all ease;
  padding: 0.4em;
  text-align: center;

  &:hover {
    transform: scale(1.1);
  }

  @media ${device.tablet} {
    font-size: 0.9rem;
  }

  @media ${device.desktop} {
    top: 80px;
    right: 40px;
    font-size: 1rem;
  }
`;
