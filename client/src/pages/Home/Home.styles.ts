import styled from "styled-components";
import { device } from "../../utils/Breakpoints";

export const Container = styled.div`
  position: relative;
  width: 95%;
  max-width: 800px;
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  margin: 1em auto;
  justify-content: center;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;
`;

export const PageTitle = styled.h3`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 1em 0;

  @media ${device.desktop} {
    font-size: 2rem;
  }
`;

export const UpArrow = styled.div`
  position: absolute;
  top: 55px;
  z-index: 1;
  cursor: pointer;
  transition: 0.3s all ease;
  color: #3200c0;

  &:hover {
    transform: scale(1.1);
  }
`;

export const DownArrow = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;
  cursor: pointer;
  transition: 0.3s all ease;
  color: #3200c0;

  &:hover {
    transform: scale(1.1);
  }
`;
