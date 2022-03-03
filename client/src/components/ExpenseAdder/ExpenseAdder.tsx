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
  ErrorContainer,
} from "./ExpenseAdder.styles";
import { MdOutlineCancel } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addExpenseItem } from "../../API/ExpenseMethods";

const schema = yup.object().shape({
  title: yup.string().min(2).max(50).required("field is required"),
  amount: yup
    .number()
    .typeError("must be a number")
    .positive("must be positive")
    .min(0)
    .required("field is required"),
});

interface ExpenseFormInputs {
  title: string;
  amount: number;
  first_name?: string;
  last_name?: string;
}

interface ExpenseAdderProps {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  toggleChange: () => void;
}

const ExpenseAdder: React.FC<ExpenseAdderProps> = ({
  setDisplayAdder,
  toggleChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ExpenseFormInputs> = (data) => {
    data.first_name = "test firstName";
    data.last_name = "test lastName";

    addExpenseItem(data);
    toggleChange();
    reset();
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

      <ExpenseForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputGroup long>
            <Label>Title</Label>
            <Input {...register("title")} />
            {errors.title && errors.title?.message && (
              <ErrorContainer>{errors.title.message}</ErrorContainer>
            )}
          </InputGroup>
          <InputGroup>
            <Label>Amount</Label>
            <Input {...register("amount")} />
            {errors.amount && errors.amount?.message && (
              <ErrorContainer>{errors.amount.message}</ErrorContainer>
            )}
          </InputGroup>
        </InputContainer>
        <FormButton type="submit">Add Expense</FormButton>
      </ExpenseForm>
    </Container>
  );
};

export default ExpenseAdder;
