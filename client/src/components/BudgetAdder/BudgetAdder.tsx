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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(CreateBudgetSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newTotal = data.total.replace("$", "").replace(",", "");
    createBudget(navigate, {
      title,
      total: +newTotal,
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

export default BudgetAdder;
