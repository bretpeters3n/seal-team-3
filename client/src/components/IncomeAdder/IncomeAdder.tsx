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
  ErrorContainer,
} from "./IncomeAdder.styles";
import { MdOutlineCancel } from "react-icons/md";
import { IncomeData } from "../../pages/Income/Income";
import { useForm, SubmitHandler } from "react-hook-form";

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

  const onSubmit: SubmitHandler<IncomeFormInputs> = (data) => {
    console.log(data.title);
  };

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

      <IncomeForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputGroup long>
            <Label>Title</Label>
            <Input
              {...register("title", {
                required: "Title field is required",
                minLength: { value: 3, message: "Needs at least 3 characters" },
              })}
            />
            <ErrorContainer>
              {errors.title && <p>{errors.title.message}</p>}
            </ErrorContainer>
          </InputGroup>
          <InputGroup>
            <Label>Amount</Label>
            <Input
              {...register("amount", {
                required: "Amount field is required",
                valueAsNumber: true,
              })}
            />
            <ErrorContainer>
              {errors.amount && <p>{errors.amount.message}</p>}
            </ErrorContainer>
          </InputGroup>
        </InputContainer>

        <FormButton type="submit">Add Income</FormButton>
      </IncomeForm>
    </Container>
  );
};

export default IncomeAdder;
