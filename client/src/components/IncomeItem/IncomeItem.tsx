import React, { useState } from "react";
import {
  Container,
  ItemName,
  ItemAmount,
  ItemOptionsContainer,
  ItemContainer,
  ItemOption,
} from "./IncomeItem.styles";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";

interface ItemData {
  id: number;
  title: string;
  amount: number;
  // deleteItem: () => void;
}

const IncomeItem: React.FC<ItemData> = ({ id, title, amount }) => {
  const [itemOptions, setItemOptions] = useState<boolean>(false);

  const toggleItemOptions = () => setItemOptions(!itemOptions);

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <Container>
      <ItemContainer onClick={toggleItemOptions}>
        <ItemName>{title}</ItemName>
        <ItemAmount>{`$${amount.toFixed(2)}`}</ItemAmount>
      </ItemContainer>
      {/* Item Options comes out on click */}
      {itemOptions && (
        <ItemOptionsContainer
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          exit={{ x: 20, opacity: 0 }}
        >
          <ItemOption blueHover onClick={handleEdit}>
            <RiEditLine size="1.5rem" />
          </ItemOption>
          <ItemOption onClick={handleDelete}>
            <RiDeleteBin6Line size="1.5rem" />
          </ItemOption>
        </ItemOptionsContainer>
      )}
    </Container>
  );
};

export default IncomeItem;
