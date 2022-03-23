import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GrFormClose } from "react-icons/gr";
import {
  Container,
  EditorContainer,
  CreateBudgetForm,
  InputContainer,
  InputGroup,
  Label,
  AmountInput,
  ErrorContainer,
  FormButton,
  TitleContainer,
  Icon,
} from "./BudgetEditor.styles";
import { CreateBudgetSchema } from "../../constants";
import { editBudget } from "../../API/BudgetMethods";
import { useNavigate } from "react-router";

interface FormInputs {
  total: string;
}

interface IBudgetEditor {
  title: string;
  currentBudget: number;
  setDisplayBudgetEditor: React.Dispatch<React.SetStateAction<boolean>>;
  currentAmount: number;
  refetchBudget: () => void;
  budgetId: string;
}

const BudgetEditor: React.FC<IBudgetEditor> = ({
  title,
  currentBudget,
  setDisplayBudgetEditor,
  currentAmount,
  refetchBudget,
  budgetId,
}) => {
  const preloadedValues = {
    total: "$" + currentBudget.toString(),
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(CreateBudgetSchema),
    defaultValues: preloadedValues,
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    editBudget(navigate, budgetId, {
      title,
      total: +data.total,
      currentAmount,
    });
    refetchBudget();
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

              <Controller
                name="total"
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
                    placeholder="Please enter a budget amount"
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
