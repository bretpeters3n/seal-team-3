import React, { useEffect, useState } from "react";
import { Container, DownArrow, PageTitle, UpArrow } from "./Home.styles";
import { BudgetCardList, Loading } from "../../components";
import { useQuery } from "react-query";
import { getAllBudgets } from "../../API/BudgetMethods";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router";

interface IHome {
  displayLoader: boolean;
  setDisplayLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<IHome> = ({ displayLoader, setDisplayLoader }) => {
  const navigate = useNavigate();
  const fetchAllBudgets = async () => {
    const data = await getAllBudgets(navigate);
    return data;
  };
  const { data, isLoading, status, refetch } = useQuery(
    "budgets",
    fetchAllBudgets,
    {}
  );

  const [position, setPosition] = useState<number>(12);

  useEffect(() => {
    if (displayLoader) {
      const loaderTimer = setTimeout(() => {
        setDisplayLoader(false);
      }, 3000);
      return () => clearTimeout(loaderTimer);
    }
  }, []);

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
    return <Loading />;
  }
  if (status === "error") {
    return <div>{status}</div>;
  }

  return (
    <>
      {displayLoader ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default Home;
