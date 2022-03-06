import React from "react";
import {
  Container,
  TitleContainer,
  Title,
  Button,
  TransactionForm,
  InputContainer,
  InputGroup,
  Label,
  Input,
  FormButton,
  ErrorContainer,
} from "./TransactionItemAdder.styles";
import { MdOutlineCancel } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addItem } from "../../API/TransactionMethods";
import { TransactionTransferData, TransactionType } from "../../constants";

const transactionSchema = yup.object().shape({
  title: yup.string().min(2).max(50).required("field is required"),
  amount: yup
    .number()
    .typeError("must be a number")
    .positive("must be positive")
    .min(0)
    .required("field is required"),
});

interface FormInputs {
  title: string;
  amount: number;
}

interface TransactionAdder {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRerender: () => void;
  pageType: TransactionType;
}

const TransactionItemAdder: React.FC<TransactionAdder> = ({
  setDisplayAdder,
  toggleRerender,
  pageType,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(transactionSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (
    data: TransactionTransferData
  ): void => {
    addItem(data, pageType === "expense" ? "expense" : "income");
    toggleRerender();
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
        <Title>
          Add your {`${pageType === "expense" ? "Expense" : "Income"}`}
        </Title>
        <Button onClick={() => setDisplayAdder(false)}>
          <MdOutlineCancel size="2rem" />
        </Button>
      </TitleContainer>

      <TransactionForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputGroup long>
            <Label>Title</Label>
            <Input {...register("title")} />
            <ErrorContainer>
              {errors.title && errors.title?.message && (
                <p>{errors.title.message}</p>
              )}
            </ErrorContainer>
          </InputGroup>
          <InputGroup>
            <Label>Amount</Label>
            <Input {...register("amount")} />
            <ErrorContainer>
              {errors.amount && errors.amount?.message && (
                <p>{errors.amount.message}</p>
              )}
            </ErrorContainer>
          </InputGroup>
        </InputContainer>

        <FormButton type="submit">
          Add {`${pageType === "expense" ? "Expense" : "Income"}`}
        </FormButton>
      </TransactionForm>
    </Container>
  );
};

export default TransactionItemAdder;
