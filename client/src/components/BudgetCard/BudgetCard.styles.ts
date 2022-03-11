import styled from "styled-components";
import { Link } from "react-router-dom";

interface ProgressProp {
  percentage: number;
}

interface ActiveProp {
  currentmonth: boolean;
}

export const BudgetCardContainer = styled.div<ActiveProp>`
  width: 95%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 0.5em;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1em;
  border-radius: 5px;
  opacity: ${(props) => (props.currentmonth ? "1" : ".5")};
  /* @media (min-width: 800px) {
    height: 15vh;
  } */
`;

export const BudgetTitle = styled.h1`
  font-weight: 800;
`;

export const Soft = styled.span`
  font-weight: 400;
`;

export const TotalBudgetBar = styled.div`
  width: 100%;
  height: 30px;
  background: #e0e0e0;
  border-radius: 5px;
  position: relative;
`;

export const ExpenseBar = styled.div<ProgressProp>`
  position: absolute;
  background: ${(props) => (props.percentage >= 100 ? "#FF8080" : "#14FF00")};
  border-radius: 5px;
  height: 30px;
  width: ${(props) => props.percentage}%;
  z-index: 1;
`;

export const BudgetInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BudgetInfo = styled.h3``;

export const BudgetLinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BudgetLink = styled(Link)<ActiveProp>`
  font-weight: 700;
  color: #3200c0;
  pointer-events: ${(props) => (props.currentmonth ? "auto" : "none")};
`;
