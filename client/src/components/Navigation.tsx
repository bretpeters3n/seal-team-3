import React, { useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlineMoneyOffCsred } from "react-icons/md";
import { FaRegHandshake } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 70px;
  background-color: #d3ae8b;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Logo = styled(Link)`
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 1.7rem;
  font-weight: 700;
`;

const HamburgerIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 15px;
`;

const Sidebar = styled(motion.div)`
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

const SidebarWrapper = styled.div`
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

const NavIcon = styled(Link)`
  margin-left: 2em;
  display: flex;
  align-items: center;
  gap: 1em;
`;

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "100%" },
};

const Navigation = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);

  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <Container>
      <Logo to="/">Budgety</Logo>
      <HamburgerIcon onClick={toggleSidebar}>
        {sidebar ? (
          <ImCancelCircle size="1.5rem" />
        ) : (
          <GiHamburgerMenu size="1.5rem" />
        )}
      </HamburgerIcon>
      <Sidebar variants={variants} animate={sidebar ? "open" : "closed"}>
        <SidebarWrapper>
          <NavIcon to="/">
            <AiOutlineHome size="2rem" />
            <h2>Home</h2>
          </NavIcon>
        </SidebarWrapper>
        <SidebarWrapper>
          <NavIcon to="/">
            <MdOutlineAttachMoney size="2rem" />
            <h2>Income</h2>
          </NavIcon>
        </SidebarWrapper>
        <SidebarWrapper>
          <NavIcon to="/">
            <MdOutlineMoneyOffCsred size="2rem" />
            <h2>Expenses</h2>
          </NavIcon>
        </SidebarWrapper>
        <SidebarWrapper>
          <NavIcon to="/">
            <FaRegHandshake size="2rem" />
            <h2>Combined</h2>
          </NavIcon>
        </SidebarWrapper>
      </Sidebar>
    </Container>
  );
};

export default Navigation;
