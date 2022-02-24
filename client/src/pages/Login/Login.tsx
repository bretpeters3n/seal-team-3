import React from "react";
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

const Login = () => {
  return (
    <Container
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <FormSection>
        <LoginForm>
          <Title>Login</Title>
          <InputGroup>
            <Input type="email" placeholder="Email@mail.com" />
            <Label>Email</Label>
          </InputGroup>
          <InputGroup>
            <Input type="password" placeholder="********" />
            <Label>Password</Label>
          </InputGroup>
          <Button>Login</Button>
          <Question to="/signup">Don't have an account? Sign up</Question>
        </LoginForm>
      </FormSection>

      <LogoSection>
        <Logo src={logo} alt="Budgety Logo" />
      </LogoSection>
    </Container>
  );
};

export default Login;
