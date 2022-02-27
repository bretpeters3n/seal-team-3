import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
  long?: boolean;
}

export const Container = styled(motion.div)`
  width: 95%;
  margin: 0 auto;
  margin-top: 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`;

export const Title = styled.h1``;

export const Button = styled.button`
  background: none;
  border: none;
`;

export const IncomeForm = styled.form`
  padding: 1em;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const InputGroup = styled.div<Props>`
  flex: ${(props) => (props.long ? "2" : "1")};
`;

export const Label = styled.h4``;

export const Input = styled.input`
  font-size: 1rem;
  padding: 0.5em 0.2em;
  outline: none;
  border: none;
  /* border-bottom: 1px solid black; */
  outline: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  width: 100%;
  transition: 0.3s ease all;

  &:focus {
    box-shadow: 0 0 15px rgba(211, 174, 139, 1);
    border-radius: 3px;
  }
`;

export const FormButton = styled.button`
  width: 100%;
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
