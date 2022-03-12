import styled from "styled-components";
import { device } from "../../utils/Breakpoints";

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const PageTitle = styled.h3`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 1em 0;

  @media ${device.desktop} {
    font-size: 2rem;
  }
`;
