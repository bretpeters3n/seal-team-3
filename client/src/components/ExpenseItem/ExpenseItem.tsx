import React, { useState } from "react";
import {
  Container,
  ItemName,
  ItemAmount,
  ItemOptionsContainer,
  ItemContainer,
  ItemOption,
} from "./ExpenseItem.styles";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { deleteItem } from "../../API/IEMethods";

interface ExpenseDataProps {
  id: string;
  title: string;
  amount: number;
  toggleChange: () => void;
}

const ExpenseItem: React.FC<ExpenseDataProps> = ({
  id,
  title,
  amount,
  toggleChange,
}) => {
  const [itemOptions, setItemOptions] = useState<boolean>(false);

  const toggleItemOptions = () => setItemOptions(!itemOptions);

  const handleDelete = () => {
    deleteItem(id, "expense");
    toggleChange();
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
          exit={{ x: 20, opacity: 0, transition: { duration: 0.3 } }}
        >
          <ItemOption blueHover>
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

export default ExpenseItem;
