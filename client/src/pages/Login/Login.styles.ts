import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { device } from "../../utils/Breakpoints";

export const Container = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 1em;
  position: relative;

  @media ${device.desktop} {
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const LogoSection = styled.div`
  /* position: absolute;
  top: 0;
  z-index: -1; */
  display: none;
  @media ${device.desktop} {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: unset;
  }
`;

export const FormSection = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  @media ${device.desktop} {
    flex: 1;
    justify-content: center;
    height: unset;
  }
`;

export const Title = styled.h1`
  margin-bottom: 0.4em;
`;

export const Logo = styled.img`
  width: 200px;
  @media ${device.desktop} {
    width: 400px;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 90%;
  max-width: 350px;

  @media ${device.desktop} {
    width: 80%;
    max-width: 350px;
  }
`;

export const InputGroup = styled.div``;

export const Label = styled.p`
  font-size: 1.1rem;
  margin-top: 0.5em;
`;

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
  color: #3200c0;
  text-align: center;
  font-size: 1rem;
`;

export const LoginErrorContainer = styled.div`
  color: red;
  font-size: 0.8rem;
  position: absolute;
`;
