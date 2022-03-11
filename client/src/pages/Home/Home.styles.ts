import styled from "styled-components";
import { device } from "../../utils/Breakpoints";

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  height: calc(100vh - 70px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Carousel = styled.div`
  width: 100%;
  height: 80vh;
  overflow: hidden;
  margin: auto auto;
`;

export const PageTitle = styled.h3`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-top: 1em;

  @media ${device.desktop} {
    font-size: 2rem;
  }
`;
