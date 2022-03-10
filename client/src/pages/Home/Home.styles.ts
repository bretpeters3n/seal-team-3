import styled from "styled-components";
import { Link } from "react-router-dom";

interface StyledProps {
  percentage: number;
}

export const Container = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

export const PageTitle = styled.h3`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-top: 1em;
`;

export const BudgetMainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 1em;
  border-radius: 5px;
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
  background: lightgray;
  border-radius: 5px;
  position: relative;
`;

export const ExpenseBar = styled.div<StyledProps>`
  position: absolute;
  background: ${(props) => (props.percentage >= 100 ? "#ff595e" : "#25a244")};
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

export const BudgetLink = styled(Link)`
  font-weight: 700;
  color: #6540d0;
`;
