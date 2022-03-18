import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
`;

export const LoadingContainer = styled(motion.div)`
  width: 95vw;
  height: calc(100vh - 70px);
  max-width: 600px;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 2em;
  align-items: center;
  position: relative;
  color: #542400;
`;

export const LogoSection = styled.div``;

export const Image = styled.img`
  width: 180px;
`;

export const Subtitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 0.3em;
  text-align: center;
`;

export const QuoteSection = styled.div`
  text-align: center;
  background-color: none;
`;

export const InfoSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90%;
`;

export const Progress = styled.div``;

export const CloseButton = styled.div`
  position: absolute;
  right: 2em;
  top: 2em;
  transition: 0.2s all ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const DividerLine = styled.span`
  height: 8px;
  width: 40px;
  background-color: #cc9b6d;
  display: block;
`;
