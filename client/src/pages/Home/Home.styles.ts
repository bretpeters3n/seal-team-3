import styled from "styled-components";
import { device } from "../../utils/Breakpoints";


interface ProgressProp {
  percentage: number;
}

interface ActiveProp {
  currentmonth: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 1em;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2em;
  align-items: center;
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


