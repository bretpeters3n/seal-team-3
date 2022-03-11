import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100%;
  perspective: 1000px;
`;

export const Carousel = styled.div`
  position: absolute;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  margin: auto auto;
  transform-style: preserve-3d;
  tarnsition: transform 1s;
`;
