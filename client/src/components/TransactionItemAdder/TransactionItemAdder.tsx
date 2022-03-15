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
import {
  TransactionTransferData,
  TransactionType,
  TransactionSchema,
} from "../../constants";
import { editBudget } from "../../API/BudgetMethods";
import { useOutletContext, useParams } from "react-router-dom";

interface FormInputs {
  title: string;
  amount: number;
  category: string;
}

interface ITransactionItemAdder {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRerender: () => void;
  pageType: TransactionType;
}

const TransactionItemAdder: React.FC<ITransactionItemAdder> = ({
  setDisplayAdder,
  toggleRerender,
  pageType,
}) => {
  // const [category, setCategory] = useState<string>("");
  const { budgetId } = useParams();

  const budgetData: any = useOutletContext();

  console.log("items page", budgetData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormInputs>({
    resolver: yupResolver(TransactionSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (
    data: TransactionTransferData
  ): void => {
    addItem(
      {
        title: data.title,
        amount: pageType === "expense" ? data.amount * -1 : data.amount,
      },
      budgetId,
      getValues("category")
    );
    editBudget(budgetData.id, {
      title: budgetData.title,
      total: budgetData.total,
      currentAmount: budgetData.currentAmount + parseFloat(getValues("title")),
    });
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
            <Input
              {...register("amount")}
              inputMode="numeric"
              autoComplete="transaction-amount"
            />
            <ErrorContainer>
              {errors.amount && errors.amount?.message && (
                <p>{errors.amount.message}</p>
              )}
            </ErrorContainer>
          </InputGroup>
          <InputGroup>
            <Label>Category</Label>
            <Select {...register("category")}>
              {budgetData.state.categories.map((category: any) => (
                <option key={category.title} value={category._id}>
                  {category.title}
                </option>
              ))}
            </Select>
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
