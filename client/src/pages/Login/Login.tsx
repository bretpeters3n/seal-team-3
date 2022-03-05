import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import logo from "../../assets/budgety_logo.png";
import {
  Container,
  Logo,
  LoginForm,
  InputGroup,
  Label,
  Input,
  Button,
  Question,
  LogoSection,
  FormSection,
  Title,
} from "./Login.styles";

const Loginschema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required().matches(/^[A-Za-z]+$/i)
})

interface LoginInputs {
  email: string;
  password: string;
}

export default function Login() {

  const { register, handleSubmit, formState: {errors} } = useForm<LoginInputs>({
    resolver: yupResolver(Loginschema),
  });
  // @ts-ignore 
  const submitForm = (data) => {};
  
  

  return (
    <Container
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <FormSection>
        <LoginForm onSubmit={handleSubmit(submitForm)}>
          <Title>Login</Title>
          <InputGroup>
            <Label>Email</Label>
            <Input type="text" {...register("email")}/>
            {errors.email && errors.email?.message && (
            <p> {errors.email.message}</p>)}
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Input {...register("password")}/>
            {errors.password && errors.password?.message && (
            <p>{errors.password.message}</p>)}
          </InputGroup>
          <Button>Login</Button>
          <Question to="/signup">Don&#39;t have an account? Sign up</Question>
        </LoginForm>
      </FormSection>

      <LogoSection>
        <Logo src={logo} alt="Budgety Logo" />
      </LogoSection>
    </Container>
  );
}; 