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
} from "./styles";

const Login = () => {
  return (
    <Container>
      <Logo src={logo} alt="Budgety Logo" />
      <LoginForm>
        <InputGroup>
          <Input />
          <Label>Email</Label>
        </InputGroup>
        <InputGroup>
          <Input type="password" />
          <Label>Password</Label>
        </InputGroup>
        <Button>Login</Button>
      </LoginForm>
    </Container>
  );
};

export default Login;
