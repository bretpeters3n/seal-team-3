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
  Question
} from "./Signup.styles";

const Signup = () => {
  const [firstPassword, setFirstPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation to see if all fields are filled
    if (email === "" || firstPassword === "" || secondPassword === "") {
      alert("Please fill out all fields");
      return;
    }

    // Validation to see if passwords match
    if (!checkIfPasswordsMatch(firstPassword, secondPassword)) {
      alert("Passwords do not match.");
      return;
    }

    // Code when all fields are filled properly
    console.log("success");
  };

  const checkIfPasswordsMatch = (a: string, b: string) => {
    if (a !== b) return false;
    return true;
  };

  console.log(email);

  return (
    <Container>
      <Logo src={logo} alt="Budgety Logo" />
      <LoginForm onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
        <InputGroup>
          <Input
            type="email"
            value={email}
            onChange={(e:React.FormEvent) => setEmail((e.target as HTMLInputElement).value)}
          />
          <Label>Email</Label>
        </InputGroup>
        <InputGroup>
          <Input
            type="password"
            value={firstPassword}
            onChange={(e:React.FormEvent) => setFirstPassword((e.target as HTMLInputElement).value)}
          />
          <Label>Password</Label>
        </InputGroup>
        <InputGroup>
          <Input
            type="password"
            value={secondPassword}
            onChange={(e:React.FormEvent) => setSecondPassword((e.target as HTMLInputElement).value)}
          />
          <Label>Confirm Password</Label>
        </InputGroup>
        <Button>Register</Button>
        <Question to='/login'>Already have an account?</Question>
      </LoginForm>
    </Container>
  );
};

export default Signup;
