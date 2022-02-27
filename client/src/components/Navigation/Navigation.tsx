import React, { useState } from "react";
import {
  Container,
  Logo,
  HamburgerIcon,
  Sidebar,
  SidebarWrapper,
  NavIcon,
  DesktopNav,
  LogoImg,
} from "./Navigation.styles";
import logo from "../../assets/budgety_small_logo.png";
// ICON IMPORTS
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineAttachMoney,
  MdOutlineMoneyOffCsred,
  MdOutlineEventNote,
} from "react-icons/md";
import { FaRegHandshake } from "react-icons/fa";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { HiOutlineUserAdd } from "react-icons/hi";

// VARIANTS FOR SIDEBAR FRAMER MOTION
const animationVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "100%" },
};

interface Props {
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<Props> = ({ user, setUser }) => {
  // Sidebar state is being used to see whether sidebar is open or not
  const [sidebar, setSidebar] = useState<boolean>(false);

  // Function to toggle sidebar on/off
  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <Container>
      <Logo to="/">
        <LogoImg src={logo} alt="budgety" />
      </Logo>

      {/* NAV FOR DESKTOP VIEW - breakpoint at 800px */}
      <DesktopNav>
        {user ? (
          <>
            <SidebarWrapper>
              <NavIcon to="/budget">
                <h2>My Budget</h2>
              </NavIcon>
            </SidebarWrapper>

            {/* 
            <SidebarWrapper>
              <NavIcon to="/budget/income">
                <h2>Income</h2>
              </NavIcon>
            </SidebarWrapper>
            <SidebarWrapper>
              <NavIcon to="/budget/expenses">
                <h2>Expenses</h2>
              </NavIcon>
            </SidebarWrapper>
            <SidebarWrapper>
              <NavIcon to="/budget/combined">
                <h2>Combined</h2>
              </NavIcon>
            </SidebarWrapper> */}
            <SidebarWrapper>
              <NavIcon
                to="/"
                onClick={() => {
                  setUser(!user);
                  setSidebar(false);
                }}
              >
                <BiLogOut size="1.5rem" />
              </NavIcon>
            </SidebarWrapper>
          </>
        ) : (
          <>
            <SidebarWrapper>
              <NavIcon to="/login" outlined>
                <h2>Login</h2>
              </NavIcon>
            </SidebarWrapper>
            <SidebarWrapper>
              <NavIcon to="/signup" filled outlined>
                <h2>Signup</h2>
              </NavIcon>
            </SidebarWrapper>
          </>
        )}
      </DesktopNav>

      {/* SIDEBAR FOR MOBILE VIEW */}
      <HamburgerIcon onClick={toggleSidebar}>
        {sidebar ? (
          <ImCancelCircle size="1.5rem" />
        ) : (
          <GiHamburgerMenu size="1.5rem" />
        )}
      </HamburgerIcon>
      <Sidebar
        variants={animationVariants}
        animate={sidebar ? "open" : "closed"}
      >
        {user ? (
          <>
            <SidebarWrapper>
              <NavIcon to="/" onClick={() => setSidebar(false)}>
                <AiOutlineHome size="2rem" />
                <h2>Home</h2>
              </NavIcon>
            </SidebarWrapper>
            <SidebarWrapper>
              <NavIcon to="/budget" onClick={() => setSidebar(false)}>
                <MdOutlineEventNote size="2rem" />
                <h2>My Budget</h2>
              </NavIcon>
            </SidebarWrapper>
            {/* <SidebarWrapper>
              <NavIcon to="/budget/income" onClick={() => setSidebar(false)}>
                <MdOutlineAttachMoney size="2rem" />
                <h2>Income</h2>
              </NavIcon>
            </SidebarWrapper>
            <SidebarWrapper>
              <NavIcon to="/budget/expenses" onClick={() => setSidebar(false)}>
                <MdOutlineMoneyOffCsred size="2rem" />
                <h2>Expenses</h2>
              </NavIcon>
            </SidebarWrapper>
            <SidebarWrapper>
              <NavIcon to="/budget/combined" onClick={() => setSidebar(false)}>
                <FaRegHandshake size="2rem" />
                <h2>Combined</h2>
              </NavIcon>
            </SidebarWrapper> */}
            <SidebarWrapper>
              <NavIcon
                to="/"
                onClick={() => {
                  setUser(!user);
                  setSidebar(false);
                }}
              >
                <BiLogOut size="2rem" />
                <h2>Logout</h2>
              </NavIcon>
            </SidebarWrapper>
          </>
        ) : (
          <>
            <SidebarWrapper>
              <NavIcon to="/login">
                <BiLogIn size="1.5rem" />
                <h2>Login</h2>
              </NavIcon>
            </SidebarWrapper>
            <SidebarWrapper>
              <NavIcon to="/signup">
                <HiOutlineUserAdd size="1.5rem" />
                <h2>Signup</h2>
              </NavIcon>
            </SidebarWrapper>
          </>
        )}
      </Sidebar>
    </Container>
  );
};

export default Navigation;
