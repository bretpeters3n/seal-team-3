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
} from "./Login.styles";

const Login = () => {
  return (
    <Container
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Logo src={logo} alt="Budgety Logo" />
      <LoginForm>
        <InputGroup>
          <Input type="email" />
          <Label>Email</Label>
        </InputGroup>
        <InputGroup>
          <Input type="password" />
          <Label>Password</Label>
        </InputGroup>
        <Button>Login</Button>
        <Question to="/signup">Need to register for a new account?</Question>
      </LoginForm>
    </Container>
  );
};

export default Login;
