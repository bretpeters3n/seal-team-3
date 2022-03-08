import React from "react";
import { signUp } from "../../API/AuthMethods";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../../assets/budgety_logo.png";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Logo,
  LoginForm,
  InputGroup,
  Label,
  Input,
  Button,
  Question,
  Title,
  LogoSection,
  FormSection,
  SignUpErrorContainer,
} from "./Signup.styles";
import { UserInfoData } from "../../constants";

const signUpSchema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name."),
  lastName: yup.string().required("Please enter your last name."),
  email: yup
    .string()
    .email("Must be a valid email.")
    .required("Please enter a valid email address."),
  password: yup
    .string()
    .required("Please enter a password.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
    ),
});

interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignInProps {
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<SignInProps> = ({ setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormInputs> = (
    userInfo: UserInfoData
  ): void => {
    signUp(userInfo, navigate, setUser);
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
          <Title>Create an account</Title>
          <InputGroup>
            <Label>First Name</Label>
            <Input {...register("firstName")} />
            <SignUpErrorContainer>
              {errors.firstName && errors.firstName?.message && (
                <p>{errors.firstName.message}</p>
              )}
            </SignUpErrorContainer>
          </InputGroup>
          <InputGroup>
            <Label>Last Name</Label>
            <Input {...register("lastName")} />
            <SignUpErrorContainer>
              {errors.lastName && errors.lastName?.message && (
                <p>{errors.lastName.message}</p>
              )}
            </SignUpErrorContainer>
          </InputGroup>
          <InputGroup>
            <Label>Email</Label>
            <Input {...register("email")} />
            <SignUpErrorContainer>
              {errors.email && errors.email?.message && (
                <p>{errors.email.message}</p>
              )}
            </SignUpErrorContainer>
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Input type="password" {...register("password")} />
            <SignUpErrorContainer>
              {errors.password && errors.password?.message && (
                <p>{errors.password.message}</p>
              )}
            </SignUpErrorContainer>
          </InputGroup>
          <Button type="submit">Register</Button>
          <Question to="/login">Already have an account?</Question>
        </LoginForm>
      </FormSection>
      <LogoSection>
        <Logo src={logo} alt="Budgety Logo" />
      </LogoSection>
    </Container>
  );
};

export default Signup;
