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
  overflow-y: auto;
  position: relative;

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: whitesmoke;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
  }
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

export const NoTransactionsMessage = styled.div`
  text-align: center;
  padding: 1em 0;
`;

export const Title = styled.h1``;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
