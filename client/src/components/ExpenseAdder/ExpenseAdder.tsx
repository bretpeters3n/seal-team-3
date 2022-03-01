import React from "react";
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

interface ExpenseProps {
    setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpenseAdder: React.FC<ExpenseProps> = ({ setDisplayAdder }) => {
  const handleSubmit = () => {};

  return (
    <Container
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.15 }}
      exit={{ y: -20, opacity: 0, transition: { duration: 0.1 } }}
    >
      <TitleContainer>
        <Title>Add your Expense</Title>
        <Button onClick={() => setDisplayAdder(false)}>
          <MdOutlineCancel size="1.5rem" />
        </Button>
      </TitleContainer>

      <ExpenseForm onSubmit={handleSubmit}>
        <InputContainer>
          <InputGroup long>
            <Label>Title</Label>
            <Input type="text" />
          </InputGroup>
          <InputGroup>
            <Label>Amount</Label>
            <Input type="number" />
          </InputGroup>
        </InputContainer>
        <FormButton type="submit">Add Expense</FormButton>
      </ExpenseForm>
    </Container>
  );
};

export default ExpenseAdder;