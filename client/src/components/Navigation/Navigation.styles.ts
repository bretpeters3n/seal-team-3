import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Container = styled.div`
  height: 70px;
  background-color: #d3ae8b;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Logo = styled(Link)`
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 1.7rem;
  font-weight: 700;
`;

export const HamburgerIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 15px;
`;

export const Sidebar = styled(motion.div)`
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 70px;
  background-color: #d3ae8b;
  right: 0;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

export const SidebarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1em;
  padding: 2px;
  transition: 0.2s ease all;

  &:hover {
    transform: scale(1.02);
  }
`;

export const NavIcon = styled(Link)`
  margin-left: 2em;
  display: flex;
  align-items: center;
  gap: 1em;
`;
