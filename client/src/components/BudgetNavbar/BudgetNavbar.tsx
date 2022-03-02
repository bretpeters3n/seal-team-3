import React, { useState } from "react";
import { Container, List, ListItem, ListItemText } from "./BudgetNavbar.styles";

const BudgetNavbar = () => {
  const tabs = ["Income", "Expenses", "Combined"];

  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  return (
    <Container>
      <List>
        {tabs.map((item) => (
          <ListItem
            key={item}
            className={item === selectedTab ? "selected" : ""}
            onClick={() => setSelectedTab(item)}
          >
            <ListItemText
              to={`/budget/${item.toLowerCase()}`}
              className={item === selectedTab ? "selected" : ""}
            >
              {item}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BudgetNavbar;
