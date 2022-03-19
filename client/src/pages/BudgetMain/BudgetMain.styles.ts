import styled from "styled-components";
import { motion } from "framer-motion";
import { device } from "../../utils/Breakpoints";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

interface ProgressProp {
  percentage: number;
}

interface ColorProp {
  textColor: string;
}

export const Container = styled(motion.div)`
  padding: 1em;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const BudgetCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  padding: 1em;

  @media ${device.desktop} {
    padding: 1em;
  }
`;

export const BudgetTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BudgetTitle = styled.h1``;

export const BudgetEditorButton = styled.a`
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s all ease;
  color: #3200c0;
  &:hover {
    transform: scale(1.05);
  }
`;

export const TotalBudgetBar = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  background: #e0e0e0;
  border-radius: 5px;
`;

export const PercentageDisplay = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: 400;
  z-index: 5;
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
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 5px;
`;

export const TransactionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border-radius: 5px;
`;

export const TransactionTitle = styled.div``;

export const TransactionAmount = styled.div<ColorProp>`
  color: ${(props) => props.textColor};
  font-weight: 600;
`;

export const BudgetLinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;

  @media ${device.desktop} {
    justify-content: space-between;
  }
`;

export const BudgetButton = styled(Button)`
  background-color: #3200c0;
`;

export const BudgetLink = styled(NavLink)`
  font-weight: 700;
  font-size: 16px;
  font-family: Urbanist;
  color: #3200c0;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ButtonStyles = {
  "&.MuiButton-root": {
    border: "2px #3200c0 solid",
    textTransform: "none",
    padding: "2px 8px",
    "&:hover": {
      backgroundColor: "#f2edff",
    },
  },
  "&.MuiButton-contained": {
    color: "#3200c0",
    background: "#FFFFFF",
  },
};
