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

interface ItemDataProps {
  id: number;
  title: string;
  amount: number;
  deleteItem: (targetId: number) => void;
}

const IncomeItem: React.FC<ItemDataProps> = ({
  id,
  title,
  amount,
  deleteItem,
}) => {
  const [itemOptions, setItemOptions] = useState<boolean>(false);

  const toggleItemOptions = () => setItemOptions(!itemOptions);

  const handleEdit = () => {};

  const handleDelete = (id: number) => {
    deleteItem(id);
  };

  return (
    <Container
      exit={{
        opacity: 0,
        x: 500,
        backgroundColor: "#D25E5D",
        transition: { duration: 0.2 },
      }}
    >
      <ItemContainer onClick={toggleItemOptions}>
        <ItemName>{title}</ItemName>
        <ItemAmount>{`$ ${amount.toFixed(2)}`}</ItemAmount>
      </ItemContainer>
      {/* Item Options slides out on Click of each item */}
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
          <ItemOption onClick={() => handleDelete(id)}>
            <RiDeleteBin6Line size="1.5rem" />
          </ItemOption>
        </ItemOptionsContainer>
      )}
    </Container>
  );
};

export default IncomeItem;
