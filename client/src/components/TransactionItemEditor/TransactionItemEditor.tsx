import React from "react";
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
  Select,
  AmountInput,
} from "./TransactionItemEditor.styles";
import { TransactionType, TransactionSchema, ICategory } from "../../constants";
import { editItem } from "../../API/TransactionMethods";
import { editBudget } from "../../API/BudgetMethods";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

interface FormInputs {
  title: string;
  amount: string;
  categoryId: string;
}
interface TargetItem {
  id: string;
  transactionTitle: string;
  amount: number;
  pageType: TransactionType;
  setDisplayItemEditor: React.Dispatch<React.SetStateAction<boolean>>;
  setItemOptions: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRerender: () => void;
  prevCategoryId: string;
}
const TransactionItemEditor: React.FC<TargetItem> = ({
  id,
  transactionTitle,
  amount,
  pageType,
  setDisplayItemEditor,
  setItemOptions,
  toggleRerender,
  prevCategoryId,
}) => {
  const {
    data: { _id, title, currentAmount, total, categories },
  } = useOutletContext<any>();

  const { budgetId } = useParams();

  const preloadedValues = {
    title: transactionTitle,
    amount:
      pageType === "expense"
        ? "$" + (amount * -1).toString()
        : "$" + amount.toString(),
    categoryId: prevCategoryId,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(TransactionSchema),
    defaultValues: preloadedValues,
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newTotal = data.amount.replace("$", "").replace(",", "");
    editItem(
      budgetId,
      prevCategoryId,
      id,
      {
        title: data.title,
        amount: pageType === "expense" ? +newTotal * -1 : +newTotal,
        categoryId: data.categoryId,
      },
      navigate
    );
    _id &&
      editBudget(navigate, _id, {
        title: title,
        total: total,
        // NEED TO FIX THIS
        currentAmount:
          pageType === "expense"
            ? currentAmount + amount + +newTotal
            : currentAmount,
      });
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
              <AmountInput
                prefix="$"
                decimalScale={2}
                autoComplete="off"
                {...register("amount")}
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
                  categories.map((category: ICategory) => (
                    <option key={category.title} value={category._id}>
                      {category.title}
                    </option>
                  ))}
              </Select>
              <ErrorContainer>
                {errors.categoryId && errors.categoryId?.message && (
                  <p>{errors.categoryId.message}</p>
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
