import React, { useState } from "react";
import {
  Container,
  TitleContainer,
  Title,
  Button,
  ExpenseForm,
  InputContainer,
  InputGroup,
  Label,
  Input,
  FormButton,
} from "./ExpenseAdder.styles";
import { MdOutlineCancel } from "react-icons/md";
import { ExpenseData } from "../../pages/Expenses/Expenses";

interface ExpenseAdderProps {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  addItem: (newItem: ExpenseData) => void;
}

const ExpenseAdder: React.FC<ExpenseAdderProps> = ({
  setDisplayAdder,
  addItem,
}) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (
    newItem: ExpenseData,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    addItem(newItem);
    setTitle("");
    setAmount(0);
  };

  return (
    <Container
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.15 }}
      exit={{ y: -20, opacity: 0, transition: { duration: 0.1 } }}
    >
      <TitleContainer>
        <Title>Add your expense</Title>
        <Button onClick={() => setDisplayAdder(false)}>
          <MdOutlineCancel size="2rem" />
        </Button>
      </TitleContainer>

      <ExpenseForm
        onSubmit={(e) => handleSubmit({ id: 123, title, amount }, e)}
      >
        <InputContainer>
          <InputGroup long>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label>Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </InputGroup>
        </InputContainer>
        <FormButton type="submit">Add Expense</FormButton>
      </ExpenseForm>
    </Container>
  );
};

export default ExpenseAdder;
