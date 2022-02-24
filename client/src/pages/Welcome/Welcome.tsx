import React from "react";
import logo from "../../assets/budgety_logo.png";
import {
  Container,
  Logo,
  Description,
  Buttons,
  Button,
} from "./Welcome.styles";

const WelcomePage = () => {
  return (
    <Container
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      exit={{ opacity: 0, y: -20 }}
    >
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
