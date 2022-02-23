import React from "react";
import logo from "../../assets/budgety_logo.png";
import { Container, Logo, Description, Buttons, Button } from "./styles";

const WelcomePage = () => {
  return (
    <Container>
      <Logo src={logo} alt="Budgety Logo" />
      <Description>
        A basic budgeting app for your basic budgeting needs!
      </Description>
      <Buttons>
        <Button to="/login">Login</Button>
        <Button to="/signup">Sign Up</Button>
      </Buttons>
    </Container>
  );
};

export default WelcomePage;
