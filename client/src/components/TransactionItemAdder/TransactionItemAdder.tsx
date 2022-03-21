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
  Select,
} from "./TransactionItemAdder.styles";
import { MdOutlineCancel } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addItem } from "../../API/TransactionMethods";
import { editBudget } from "../../API/BudgetMethods";
import { TransactionType, TransactionSchema, ICategory } from "../../constants";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

interface FormInputs {
  title: string;
  amount: number;
  categoryId: string;
}

interface ITransactionItemAdder {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRerender: () => void;
  pageType: TransactionType;
  doRefetch: () => void;
}

const TransactionItemAdder: React.FC<ITransactionItemAdder> = ({
  setDisplayAdder,
  toggleRerender,
  pageType,
  doRefetch,
}) => {
  const { budgetId } = useParams();

  const {
    data: { _id, title, currentAmount, total, categories },
  } = useOutletContext<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<FormInputs>({
    resolver: yupResolver(TransactionSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = (data): void => {
    addItem(
      {
        title: data.title,
        amount: pageType === "expense" ? data.amount * -1 : data.amount,
        categoryId: data.categoryId,
      },
      budgetId,
      data.categoryId,
      navigate
    );
    typeof _id === "string" &&
      editBudget(navigate, _id, {
        title: title,
        total: total,
        currentAmount:
          pageType === "expense"
            ? +currentAmount + +data.amount
            : +currentAmount,
      });
    doRefetch();
    toggleRerender();
    reset();
    setFocus("title");
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
            <Input autoComplete="off" {...register("amount")} />
            <ErrorContainer>
              {errors.amount && errors.amount?.message && (
                <p>{errors.amount.message}</p>
              )}
            </ErrorContainer>
          </InputGroup>
          <InputGroup>
            <Label>Category</Label>
            <Select {...register("categoryId")}>
              {categories &&
                pageType === "income" &&
                categories.map(
                  (category: ICategory) =>
                    category.title === "Income" && (
                      <option key={category.title} value={category._id}>
                        {category.title}
                      </option>
                    )
                )}
              {categories &&
                pageType === "expense" &&
                categories.map(
                  (category: ICategory) =>
                    category.title !== "Income" && (
                      <option key={category.title} value={category._id}>
                        {category.title}
                      </option>
                    )
                )}
            </Select>
            <ErrorContainer>
              {errors.categoryId && errors.categoryId?.message && (
                <p>{errors.categoryId.message}</p>
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
