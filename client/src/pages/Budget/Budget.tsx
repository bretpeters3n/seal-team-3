import React from "react";
import { Container } from "./Budget.styles";
import { BudgetNavbar } from "../../components";
import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllBudgets } from "../../API/BudgetMethods";
import { IBudgetData } from "../../constants";

const Budget = () => {
  // const [selectedBudget, setSelectedBudget] = useState<IBudgetData | {}>({});
  const { budgetId } = useParams();

  const fetchAllBudgets = async () => {
    const data = await getAllBudgets();
    return data;
  };

  const { data, status, isLoading } = useQuery("budgets", fetchAllBudgets);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error...</div>;
  }
  const selectedBudget = data.filter(
    (budget: IBudgetData) => budget._id === budgetId
  );

  console.log("DATA", data);

  return (
    <Container>
      <BudgetNavbar />
      <Outlet context={selectedBudget} />
    </Container>
  );
};

export default Budget;
