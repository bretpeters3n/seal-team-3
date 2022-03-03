import React from "react";
import {
  Container,
  TitleContainer,
  Title,
  Button,
  IncomeForm,
  InputContainer,
  InputGroup,
  Label,
  Input,
  FormButton,
  ErrorContainer,
} from "./IncomeAdder.styles";
import { MdOutlineCancel } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addItem } from "../../API/IEMethods";

const schema = yup.object().shape({
  title: yup.string().min(2).max(50).required("field is required"),
  amount: yup
    .number()
    .typeError("must be a number")
    .positive("must be positive")
    .min(0)
    .required("field is required"),
});

interface IncomeFormInputs {
  title: string;
  amount: number;
  first_name?: string;
  last_name?: string;
}

interface IncomeAdderProps {
  setDisplayAdder: React.Dispatch<React.SetStateAction<boolean>>;
  toggleChange: () => void;
}

const IncomeAdder: React.FC<IncomeAdderProps> = ({
  setDisplayAdder,
  toggleChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IncomeFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IncomeFormInputs> = (data) => {
    data.first_name = "test firstName";
    data.last_name = "test lastName";

    // API Call to add the new Income Data to DB
    addItem(data, "income");
    toggleChange();
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
        <Title>Add your income</Title>
        <Button onClick={() => setDisplayAdder(false)}>
          <MdOutlineCancel size="2rem" />
        </Button>
      </TitleContainer>

      <IncomeForm onSubmit={handleSubmit(onSubmit)}>
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

        <FormButton type="submit">Add Income</FormButton>
      </IncomeForm>
    </Container>
  );
};

export default IncomeAdder;
