import React, { useState } from "react";
import {
  Container,
  ItemName,
  ItemAmount,
  ItemOptionsContainer,
  ItemContainer,
  ItemOption,
} from "./TransactionItem.styles";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { deleteItem } from "../../API/TransactionMethods";
import { TransactionType } from "../../constants";
import { TransactionItemEditor } from "../../components";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  toggleRerender: () => void;
  pageType: TransactionType;
}

const TransactionItem: React.FC<Transaction> = ({
  id,
  title,
  amount,
  toggleRerender,
  pageType,
}) => {
  const [itemOptions, setItemOptions] = useState<boolean>(false);
  const [displayItemEditor, setDisplayItemEditor] = useState<boolean>(false);

  const toggleItemOptions = () => setItemOptions(!itemOptions);

  const handleDelete = () => {
    deleteItem(id);
    toggleRerender();
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <Container>
      {displayItemEditor && (
        <TransactionItemEditor
          id={id}
          title={title}
          amount={amount}
          pageType={pageType}
          setDisplayItemEditor={setDisplayItemEditor}
          setItemOptions={setItemOptions}
          toggleRerender={toggleRerender}
        />
      )}
      <ItemContainer onClick={toggleItemOptions}>
        <ItemName>{title}</ItemName>
        <ItemAmount
          textColor={amount > 0 ? "#25a244" : "#ff595e"}
        >{`${currencyFormatter.format(amount)}`}</ItemAmount>
      </ItemContainer>
      {itemOptions && (
        <ItemOptionsContainer
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          exit={{ x: 20, opacity: 0 }}
        >
          <ItemOption blueHover onClick={() => setDisplayItemEditor(true)}>
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

export default TransactionItem;
