import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ItemName = styled.h3`
    font-weight: 400;
`;

export const ItemAmount = styled.h3`
    color: red;
`;