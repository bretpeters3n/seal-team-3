import React from "react";
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
  LoginErrorContainer,
} from "./Login.styles";
import logo from "../../assets/budgety_logo.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { logIn } from "../../API/AuthMethods";
import { LoginData } from "../../constants";
import { useNavigate } from "react-router-dom";

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Please enter a valid email."),
  password: yup
    .string()
    .required("Please enter a password.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
    ),
});

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LogInProps {
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LogInProps> = ({ setUser }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (userInfo: LoginData) => {
    logIn(userInfo, navigate, setUser);
    reset();
  };

  return (
    <Container
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <FormSection>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Title>Login</Title>
          <InputGroup>
            <Label>Email</Label>
            <Input type="email" {...register("email")} />
            <LoginErrorContainer>
              {errors.email && errors.email?.message && (
                <p>{errors.email.message}</p>
              )}
            </LoginErrorContainer>
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Input type="password" {...register("password")} />
            <LoginErrorContainer>
              {errors.password && errors.password?.message && (
                <p>{errors.password.message}</p>
              )}
            </LoginErrorContainer>
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

export default Login;
