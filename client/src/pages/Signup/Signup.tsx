// eslint-disable-next-line no-use-before-define
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
  Title,
  LogoSection,
  FormSection,
} from "./Signup.styles";

const Signup = () => {
  const [firstPassword, setFirstPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
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
          <Title>Create an account</Title>
          <InputGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              value={firstName}
              onChange={(e: React.FormEvent) =>
                setFirstName((e.target as HTMLInputElement).value)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              value={lastName}
              onChange={(e: React.FormEvent) =>
                setLastName((e.target as HTMLInputElement).value)
              }
            />
          </InputGroup>
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
              value={firstPassword}
              onChange={(e: React.FormEvent) =>
                setFirstPassword((e.target as HTMLInputElement).value)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={secondPassword}
              onChange={(e: React.FormEvent) =>
                setSecondPassword((e.target as HTMLInputElement).value)
              }
            />
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
