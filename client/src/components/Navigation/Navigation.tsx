import React, { useState } from "react";
import {
  Container,
  Logo,
  HamburgerIcon,
  Sidebar,
  SidebarWrapper,
  NavIcon,
} from "./styles";

// ICON IMPORTS
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlineMoneyOffCsred } from "react-icons/md";
import { FaRegHandshake } from "react-icons/fa";

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
