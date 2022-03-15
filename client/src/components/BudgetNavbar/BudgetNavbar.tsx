import React from "react";
import { Container, List, ListItem, ListItemText } from "./BudgetNavbar.styles";

const BudgetNavbar = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemText to="income">Income</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText to="expenses">Expenses</ListItemText>
        </ListItem>
      </List>
    </Container>
  );
};

export default BudgetNavbar;
