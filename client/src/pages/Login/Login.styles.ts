import styled from "styled-components";
import {Link} from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  padding: 1em;
`;

export const Logo = styled.img`
  width: 250px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: .5em;
`;

export const InputGroup = styled.div``;

export const Label = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5em;
`;

export const Input = styled.input`
  font-size: 1.5rem;
  padding: 0.3em;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
`;

export const Button = styled.button`
  padding: 0.5em 1em;
  font-size: 1.5rem;
  background: none;
  border-radius: 2em;
  border: 2px solid black;
  cursor: pointer;
  transition: 0.2s ease all;
  text-align: center;
  margin-top: 1em;

  &:hover {
    background-color: black;
    color: white;
  }
`;

export const Question = styled(Link)`
  color: blue;
  text-align: center;
  font-size: .8rem;
`;