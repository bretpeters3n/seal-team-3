import React, { useState } from "react";
import { Container, DownArrow, PageTitle, UpArrow } from "./Home.styles";
import { BudgetCardList } from "../../components";
import { useQuery } from "react-query";
import { getAllBudgets } from "../../API/BudgetMethods";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Home = () => {
  const [position, setPosition] = useState<number>(12);
  const fetchAllBudgets = async () => {
    const data = await getAllBudgets();
    return data;
  };

  const { data, isLoading, status, refetch } = useQuery(
    "budgets",
    fetchAllBudgets,
    {}
  );

  const onDown = () => {
    if (position < data.length - 1) {
      setPosition(position + 1);
    }
  };
  const onUp = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>{status}</div>;
  }

  return (
    <Container>
      <UpArrow onClick={onUp}>
        <IoIosArrowUp size="3rem" />
      </UpArrow>
      <DownArrow onClick={onDown}>
        <IoIosArrowDown size="3rem" />
      </DownArrow>
      <PageTitle>Your Budgets</PageTitle>
      <BudgetCardList
        budgets={data}
        refetch={refetch}
        position={position}
        setPosition={setPosition}
      />
    </Container>
  );
};

export default Home;
