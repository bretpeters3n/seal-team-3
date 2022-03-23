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
  AmountInput,
} from "./TransactionItemAdder.styles";
import { MdOutlineCancel } from "react-icons/md";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addItem } from "../../API/TransactionMethods";
import { editBudget } from "../../API/BudgetMethods";
import {
  TransactionType,
  TransactionAddSchema,
  ICategory,
} from "../../constants";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

interface FormInputs {
  title: string;
  amount: string;
  categoryId: string;
}

interface ITransactionItemAdder {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRerender: () => void;
  pageType: TransactionType;
  refetchBudget: () => void;
}

const TransactionItemAdder: React.FC<ITransactionItemAdder> = ({
  setDisplayAdder,
  toggleRerender,
  pageType,
  refetchBudget,
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
    control,
    clearErrors,
  } = useForm<FormInputs>({
    resolver: yupResolver(TransactionAddSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    await addItem(
      {
        title: data.title,
        amount: pageType === "expense" ? +data.amount * -1 : +data.amount,
        categoryId: data.categoryId,
      },
      budgetId,
      data.categoryId,
      navigate
    );
    typeof _id === "string" &&
      (await editBudget(navigate, _id, {
        title: title,
        total: total,
        currentAmount:
          pageType === "expense"
            ? +currentAmount + +data.amount
            : +currentAmount,
      }));
    await refetchBudget();
    reset({
      title: "",
      amount: "",
    });
    setTimeout(() => {
      clearErrors(["amount"]);
    }, 10);
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

            <Controller
              name="amount"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, name, value, ref } }) => (
                <AmountInput
                  autoComplete="off"
                  thousandSeparator={true}
                  allowNegative={false}
                  decimalSeparator="."
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowEmptyFormatting={true}
                  prefix="$ "
                  type="text"
                  displayType="input"
                  onValueChange={(values) => onChange(values.floatValue)}
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                />
              )}
            />

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
