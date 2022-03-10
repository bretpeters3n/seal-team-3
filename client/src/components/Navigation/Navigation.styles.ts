import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { device } from "../../utils/Breakpoints";

// This is to use props from styled components from Navigation.ts file
interface StyledProps {
  active?: string;
  displayoption?: string;
  activeClassName?: any;
}

export const Container = styled.div`
  height: 70px;
  background-color: #d3ae8b;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 2em;
  z-index: 2;
  overflow: hidden;

  @media ${device.desktop} {
    justify-content: space-between;
  }
`;

export const Logo = styled(Link)`
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 1.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img``;

export const HamburgerIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;

  @media ${device.desktop} {
    display: none;
  }
`;

export const DesktopNav = styled.div`
  display: none;

  @media ${device.desktop} {
    display: flex;
  }
`;

export const Sidebar = styled(motion.div)<StyledProps>`
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
  display: ${(props) => props.displayoption};
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

  @media ${device.desktop} {
    padding: unset;
  }
`;

export const NavIcon = styled(NavLink)`
  margin-left: 2em;
  display: flex;
  align-items: center;
  gap: 1em;
  border-radius: 50px;
  padding: 0.5em 1em;
  font-size: 0.8rem;

  &.active {
    background: black;
    color: white;
  }

  &#no-style {
    background: none;
    color: black;
  }
  @media (min-width: 800px) {
    margin-left: 1em;
  }
`;
