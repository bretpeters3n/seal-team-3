import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import {
  TransactionTransferData,
  TransactionType,
  TransactionSchema,
} from "../../constants";
import { editItem } from "../../API/TransactionMethods";
import { editBudget } from "../../API/BudgetMethods";
import { useOutletContext } from "react-router-dom";

interface FormInputs {
  title: string;
  amount: number;
}

interface TargetItem {
  id: string;
  title: string;
  amount: number;
  pageType: TransactionType;
  setDisplayItemEditor: React.Dispatch<React.SetStateAction<boolean>>;
  setItemOptions: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRerender: () => void;
  categoryId: string;
}

const TransactionItemEditor: React.FC<TargetItem> = ({
  id,
  title,
  amount,
  pageType,
  setDisplayItemEditor,
  setItemOptions,
  toggleRerender,
  categoryId,
}) => {
  const [prevAmount, setPrevAmount] = useState<number>(amount);

  console.log(amount);
  const preloadedValues = {
    title: title,
    amount: pageType === "expense" ? amount * -1 : amount,
  };

  const budgetData: any = useOutletContext();

  console.log("current", budgetData[0].currentAmount);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(TransactionSchema),
    defaultValues: preloadedValues,
  });

  const onSubmit: SubmitHandler<FormInputs> = (
    data: TransactionTransferData
  ) => {
    // code to run on submit
    editItem(id, {
      title: data.title,
      amount: pageType === "expense" ? data.amount * -1 : data.amount,
    });
    editBudget(budgetData[0]._id, {
      title: budgetData[0].title,
      total: budgetData[0].total,
      // Have to fix this...this is not working correctly
      currentAmount:
        pageType === "expense"
          ? budgetData[0].currentAmount - (data.amount - prevAmount)
          : budgetData[0].currentAmount,
    });
    setPrevAmount(data.amount);
    setItemOptions(false);
    setDisplayItemEditor(false);
    toggleRerender();
  };

  return (
    <Container>
      <EditorContainer
        animate={{ opacity: 1, y: 0 }}
        initial={{ y: -500, opacity: 0 }}
      >
        <TitleContainer>
          <h1>Edit transaction</h1>
          <Icon onClick={() => setDisplayItemEditor(false)}>
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

          <FormButton type="submit">Save</FormButton>
        </TransactionForm>
      </EditorContainer>
    </Container>
  );
};

export default TransactionItemEditor;
