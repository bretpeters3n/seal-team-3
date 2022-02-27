import React from "react";
import {
  Container,
  TitleContainer,
  Title,
  Button,
  IncomeForm,
  InputContainer,
  InputGroup,
  Label,
  Input,
  FormButton,
} from "./IncomeAdder.styles";
import { MdOutlineCancel } from "react-icons/md";

interface IncomeAdderProps {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
}

const IncomeAdder: React.FC<IncomeAdderProps> = ({ setDisplayAdder }) => {
  const handleSubmit = () => {};

  return (
    <Container
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.15 }}
      exit={{ y: -20, opacity: 0, transition: { duration: 0.1 } }}
    >
      <TitleContainer>
        <Title>Add your income</Title>
        <Button onClick={() => setDisplayAdder(false)}>
          <MdOutlineCancel size="2rem" />
        </Button>
      </TitleContainer>

      <IncomeForm onSubmit={handleSubmit}>
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
        <FormButton type="submit">Add Income</FormButton>
      </IncomeForm>
    </Container>
  );
};

export default IncomeAdder;
