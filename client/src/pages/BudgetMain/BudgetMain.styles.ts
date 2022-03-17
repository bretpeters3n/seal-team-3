import styled from "styled-components";

interface ProgressProp {
  percentage: number;
}

interface ColorProp {
  textColor: string;
}

export const Container = styled.div`
  padding: 1em;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const BudgetCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;
`;

export const BudgetTitle = styled.h1``;

export const TotalBudgetBar = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  background: #e0e0e0;
  border-radius: 5px;
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
export const CategoriesContainer = styled.div`
  margin-top: 2em;
`;
export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin: 1em 0;
`;

export const CategoryTitle = styled.div`
  width: 100%;
  background-color: rgba(211, 174, 139, 0.4);
  padding: 0.5em;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TransactionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const TransactionTitle = styled.div``;

export const TransactionAmount = styled.div<ColorProp>`
  color: ${(props) => props.textColor};
`;
