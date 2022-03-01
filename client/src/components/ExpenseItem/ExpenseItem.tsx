import React from "react";
import { Container, ItemName, ItemAmount } from "./ExpenseItem.styles";

interface ExpenseProps {
    id: number;
    title: string;
    amount: number;
}

const ExpenseItem: React.FC<ExpenseProps> = ({ id, title, amount }) => {
    return (
        <Container>
            <ItemName>{title}</ItemName>
            <ItemAmount>{`$${amount.toFixed(2)}`}</ItemAmount>
        </Container>
    );
};

export default ExpenseItem;