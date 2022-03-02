import React, { useState } from "react";
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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    // code to validate login and password
    e.preventDefault();
  };

  return (
    <Container
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <FormSection>
        <LoginForm onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
          <Title>Login</Title>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e: React.FormEvent) =>
                setEmail((e.target as HTMLInputElement).value)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e: React.FormEvent) =>
                setPassword((e.target as HTMLInputElement).value)
              }
            />
          </InputGroup>
          <Button>Login</Button>
          <Question to="/signup">Don&apos;t have an account? Sign Up</Question>
        </LoginForm>
      </FormSection>

      <LogoSection>
        <Logo src={logo} alt="Budgety Logo" />
      </LogoSection>
    </Container>
  );
};

export default Login;
