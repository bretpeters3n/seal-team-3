import React from "react";
import { Container, List, ListItem, ListItemText } from "./BudgetNavbar.styles";

const BudgetNavbar = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemText to="/budget/income">Income</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText to="/budget/expenses">Expenses</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText to="/budget/combined">Combined</ListItemText>
        </ListItem>
      </List>
    </Container>
  );
};

export default BudgetNavbar;
