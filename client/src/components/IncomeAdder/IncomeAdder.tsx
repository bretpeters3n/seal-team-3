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
import { IncomeData } from "../../pages/Income/Income";
import { useForm } from "react-hook-form";

interface IncomeFormInputs {
  title: string;
  amount: number;
}

interface IncomeAdderProps {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  addItem: (newItem: IncomeData) => void;
}

const IncomeAdder: React.FC<IncomeAdderProps> = ({
  setDisplayAdder,
  addItem,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncomeFormInputs>();

  console.log(errors);

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

      <IncomeForm
        onSubmit={handleSubmit((data) => console.log("data is", data))}
      >
        <InputContainer>
          <InputGroup long>
            <Label>
              Title*
              {errors.title && (
                <p style={{ color: "red" }}>{errors.title.message}</p>
              )}
            </Label>
            <Input
              {...register("title", {
                required: "This is required",
                minLength: { value: 4, message: "Needs at least 4" },
              })}
            />
          </InputGroup>
          <InputGroup>
            <Label>Amount*</Label>
            <Input
              {...register("amount", {
                required: true,
              })}
            />
          </InputGroup>
        </InputContainer>
        <FormButton type="submit">Add Income</FormButton>
      </IncomeForm>
    </Container>
  );
};

export default IncomeAdder;
