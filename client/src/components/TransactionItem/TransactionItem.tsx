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
import { useParams, useOutletContext } from "react-router-dom";
import { editBudget } from "../../API/BudgetMethods";

interface Transaction {
  itemId: string;
  transactionTitle: string;
  amount: number;
  toggleRerender: () => void;
  pageType: TransactionType;
  categoryId: string;
}

const TransactionItem: React.FC<Transaction> = ({
  itemId,
  transactionTitle,
  amount,
  toggleRerender,
  pageType,
  categoryId,
}) => {
  const [itemOptions, setItemOptions] = useState<boolean>(false);
  const [displayItemEditor, setDisplayItemEditor] = useState<boolean>(false);
  const {
    data: { _id, title, currentAmount, total },
  } = useOutletContext<any>();

  const { budgetId } = useParams();

  const toggleItemOptions = () => setItemOptions(!itemOptions);

  const handleDelete = () => {
    deleteItem(budgetId, categoryId, itemId);
    editBudget(_id, {
      title: title,
      total: total,
      currentAmount:
        pageType === "expense" ? currentAmount + amount : currentAmount,
    });
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
          id={itemId}
          transactionTitle={transactionTitle}
          amount={amount}
          pageType={pageType}
          prevCategoryId={categoryId}
          setDisplayItemEditor={setDisplayItemEditor}
          setItemOptions={setItemOptions}
          toggleRerender={toggleRerender}
        />
      )}
      <ItemContainer onClick={toggleItemOptions}>
        <ItemName>{transactionTitle}</ItemName>
        <ItemAmount
          textColor={pageType === "income" ? "#25a244" : "#ff595e"}
        >{`${currencyFormatter.format(Math.abs(amount))}`}</ItemAmount>
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
