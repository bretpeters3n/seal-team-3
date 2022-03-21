import styled from "styled-components";
import { motion } from "framer-motion";
import { device } from "../../utils/Breakpoints";

interface ProgressProp {
  percentage: number;
}

interface ActiveProp {
  $current?: boolean;
  active?: boolean;
}

export const BudgetCardContainer = styled(motion.div)<ActiveProp>`
  position: absolute;
  background: white;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  box-shadow: ${(props) =>
    props.$current
      ? "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;"
      : "rgba(0, 0, 0, 0.24) 0px 3px 8px"};
  padding: 1em;
  border-radius: 5px;
  opacity: ${(props) => (props.$current ? "1" : ".15")};
  z-index: ${(props) => (props.$current ? 1 : 0)};

  &:hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;

export const BudgetTitle = styled.h1`
  font-weight: 800;
`;

export const Soft = styled.span`
  font-weight: 400;
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
  font-size: 1.2rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: 400;
`;

export const ExpenseBar = styled.div<ProgressProp>`
  position: absolute;
  background: ${(props) => (props.percentage >= 100 ? "#FF8080" : "#14FF00")};
  border-radius: 5px;
  height: 30px;
  width: ${(props) => props.percentage}%;
`;

export const BudgetInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;

  @media ${device.tablet} {
    font-size: 1rem;
  }
  @media ${device.desktop} {
    font-size: 1.1rem;
  }
`;

export const BudgetInfo = styled.h3``;

export const CreateBudgetButton = styled.div<ActiveProp>`
  display: ${(props) => (props.active ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  color: #3200c0;
  transition: 0.2s all ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const NoBudgetMessage = styled.div`
  width: 100%;
`;
