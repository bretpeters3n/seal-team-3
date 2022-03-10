import styled from "styled-components";
import { Link } from "react-router-dom";
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

export const BudgetMainContainer = styled.div<ActiveProp>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 1em;
  border-radius: 5px;
  opacity: ${(props) => (props.currentmonth ? "1" : ".4")};
`;

export const BudgetTitle = styled.h1`
  letter-spacing: 0.1em;
  font-weight: 800;
  text-transform: uppercase;
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

export const AddButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  transition: 0.2s all ease;

  &:hover {
    transform: scale(1.05);
  }
`;
