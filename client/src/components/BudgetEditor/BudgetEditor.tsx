import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GrFormClose } from "react-icons/gr";
import {
  Container,
  EditorContainer,
  CreateBudgetForm,
  InputContainer,
  InputGroup,
  Label,
  Input,
  ErrorContainer,
  FormButton,
  TitleContainer,
  Icon,
} from "./BudgetEditor.styles";
import { CreateBudgetSchema } from "../../constants";
import { editBudget } from "../../API/BudgetMethods";

interface FormInputs {
  total: string;
}

interface IBudgetEditor {
  title: string;
  currentBudget: number;
  setDisplayBudgetEditor: React.Dispatch<React.SetStateAction<boolean>>;
  currentAmount: number;
  doRefetch: () => void;
  budgetId: string;
}

const BudgetEditor: React.FC<IBudgetEditor> = ({
  title,
  currentBudget,
  setDisplayBudgetEditor,
  currentAmount,
  doRefetch,
  budgetId,
}) => {
  const preloadedValues = {
    total: currentBudget.toString(),
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(CreateBudgetSchema),
    defaultValues: preloadedValues,
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newTotal = data.total.replace("$", "").replace(",", "");
    editBudget(budgetId, {
      title,
      total: +newTotal,
      currentAmount,
    });
    doRefetch();
    setDisplayBudgetEditor(false);
  };

  return (
    <Container>
      <EditorContainer
        animate={{ opacity: 1, y: 0 }}
        initial={{ y: -500, opacity: 0 }}
      >
        <TitleContainer>
          <h1>{title}</h1>
          <Icon onClick={() => setDisplayBudgetEditor(false)}>
            <GrFormClose size="2rem" />
          </Icon>
        </TitleContainer>
        <CreateBudgetForm onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <InputGroup>
              <Label>Edit your budget for the month:</Label>
              <Input
                placeholder="Please enter a budget amount"
                prefix="$"
                decimalScale={2}
                {...register("total")}
              />
              <ErrorContainer>
                {errors.total && errors.total?.message && (
                  <p>{errors.total.message}</p>
                )}
              </ErrorContainer>
            </InputGroup>
          </InputContainer>

          <FormButton type="submit">Save</FormButton>
        </CreateBudgetForm>
      </EditorContainer>
    </Container>
  );
};

export default BudgetEditor;
