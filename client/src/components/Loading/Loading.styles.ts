import styled from "styled-components";
import { motion } from "framer-motion";
import { device } from "../../utils/Breakpoints";

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
  height: calc(100vh - 200px);
  max-width: 600px;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: #542400;

  @media ${device.desktop} {
    min-height: 600px;
  }
`;

export const LogoSection = styled.div``;

export const Image = styled.img`
  width: 150px;
`;

export const Subtitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 0.3em;
  text-align: center;
`;

export const QuoteSection = styled.div`
  background-color: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1em;
`;

export const InfoSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Progress = styled.div``;

export const DividerLine = styled.div`
  height: 5px;
  width: 40px;
  background-color: #cc9b6d;
  display: block;
`;
