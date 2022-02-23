import React from "react";
import styled from "styled-components";
import logo from "../assets/budgety_logo.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  padding: 1em;
`;

const Logo = styled.img`
  width: 250px;
`;

const Description = styled.h2`
  text-align: center;
  font-weight: 400;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Button = styled(Link)`
  padding: 0.5em 1em;
  font-size: 1.5rem;
  background: none;
  border-radius: 2em;
  border: 2px solid black;
  cursor: pointer;
  transition: 0.2s ease all;
  text-align: center;

  &:hover {
    background-color: black;
    color: white;
  }
`;

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
