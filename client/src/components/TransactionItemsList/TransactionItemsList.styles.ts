import styled from "styled-components";

interface StyleProp {
  maxHeight: string;
}

export const Container = styled.div`
  width: 100%;
  margin-bottom: 1em;
`;

export const TransactionsContainer = styled.div<StyleProp>`
  width: 95%;
  max-height: ${(props) => props.maxHeight};
  margin: 0 auto;
  margin-top: 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: scroll;
  position: relative;
`;

export const TitleContainer = styled.div`
  position: sticky;
  top: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding: 1em;
`;

export const Title = styled.h1``;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
