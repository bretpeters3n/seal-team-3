import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GrFormClose } from "react-icons/gr";
import {
  Container,
  EditorContainer,
  TransactionForm,
  InputContainer,
  InputGroup,
  Label,
  Input,
  ErrorContainer,
  FormButton,
  TitleContainer,
  Icon,
} from "./TransactionItemEditor.styles";
import { TransactionTransferData } from "../../constants";

const transactionSchema = yup.object().shape({
  title: yup.string().min(2).max(50).required("field is required"),
  amount: yup
    .number()
    .typeError("must be a number")
    .positive("must be positive")
    .min(0)
    .required("field is required"),
});

interface Editor {
  toggleItemEditor: () => void;
}

interface FormInputs {
  title: string;
  amount: number;
}

const TransactionItemEditor: React.FC<Editor> = ({ toggleItemEditor }) => {
  const preloadedValues = {
    title: "cool",
    amount: 0,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(transactionSchema),
    defaultValues: preloadedValues,
  });

  const onSubmit: SubmitHandler<FormInputs> = (
    data: TransactionTransferData
  ) => {
    // code to run on submit
    toggleItemEditor();
    reset();
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <EditorContainer
        animate={{ opacity: 1, y: 0 }}
        initial={{ y: -500, opacity: 0 }}
      >
        <TitleContainer>
          <h1>Edit transaction</h1>
          <Icon onClick={toggleItemEditor}>
            <GrFormClose size="2rem" />
          </Icon>
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

          <FormButton type="submit">Finish</FormButton>
        </TransactionForm>
      </EditorContainer>
    </Container>
  );
};

export default TransactionItemEditor;
