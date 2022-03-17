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
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { logOut } from "../../API/AuthMethods";

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
  const [sidebar, setSidebar] = useState<boolean>(false);
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
              <NavIcon to="/">
                <h2>Home</h2>
              </NavIcon>
            </SidebarWrapper>
            <SidebarWrapper>
              <NavIcon
                to="/"
                onClick={() => {
                  setUser(false);
                  setSidebar(false);
                  logOut();
                }}
                id="no-style"
              >
                <h2>Logout</h2>
              </NavIcon>
            </SidebarWrapper>
          </>
        ) : (
          // DESKTOP - when user does not exist
          <>
            <SidebarWrapper>
              <NavIcon to="/login">
                <h2>Login</h2>
              </NavIcon>
            </SidebarWrapper>
            <SidebarWrapper>
              <NavIcon to="/signup">
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
        displayoption={sidebar ? "flex" : "none"}
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
              <NavIcon
                to="/"
                onClick={() => {
                  setUser(false);
                  setSidebar(false);
                  logOut();
                }}
                id="no-style"
              >
                <BiLogOut size="2rem" />
                <h2>Logout</h2>
              </NavIcon>
            </SidebarWrapper>
          </>
        ) : (
          <>
            <SidebarWrapper>
              <NavIcon to="/login" onClick={() => setSidebar(false)}>
                <BiLogIn size="1.5rem" />
                <h2>Login</h2>
              </NavIcon>
            </SidebarWrapper>
            <SidebarWrapper>
              <NavIcon to="/signup" onClick={() => setSidebar(false)}>
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
