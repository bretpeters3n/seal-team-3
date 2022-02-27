import React from "react";
import { Container, ItemName, ItemAmount } from "./IncomeItem.styles";

interface ItemData {
  id: number;
  title: string;
  amount: number;
}

const IncomeItem: React.FC<ItemData> = ({ id, title, amount }) => {
  return (
    <Container>
      <ItemName>{title}</ItemName>
      <ItemAmount>{`$${amount.toFixed(2)}`}</ItemAmount>
    </Container>
  );
};

export default IncomeItem;
