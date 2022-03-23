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
} from "./BudgetAdder.styles";
import { CreateBudgetSchema } from "../../constants";
import { createBudget } from "../../API/BudgetMethods";
import { useNavigate } from "react-router";

interface FormInputs {
  total: string;
}

interface IBudgetAdder {
  title: string;
  currentAmount: number;
  setDisplayBudgetAdder: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRerender: () => void;
}

const BudgetAdder: React.FC<IBudgetAdder> = ({
  title,
  currentAmount,
  setDisplayBudgetAdder,
  toggleRerender,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInputs>({
    resolver: yupResolver(CreateBudgetSchema),
    defaultValues: {
      total: "0",
    },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    createBudget(navigate, {
      title,
      total: +data.total,
      currentAmount,
    });
    setDisplayBudgetAdder(false);
    toggleRerender();
  };

  return (
    <Container>
      <EditorContainer
        animate={{ opacity: 1, y: 0 }}
        initial={{ y: -500, opacity: 0 }}
      >
        <TitleContainer>
          <h1>{title}</h1>
          <Icon onClick={() => setDisplayBudgetAdder(false)}>
            <GrFormClose size="2rem" />
          </Icon>
        </TitleContainer>
        <CreateBudgetForm onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <InputGroup>
              <Label>Set a budget for the month:</Label>

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

export default BudgetAdder;
