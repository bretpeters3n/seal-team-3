import React, { useState } from "react";
import { Container, List, ListItem } from "./BudgetNavbar.styles";

const IENav = () => {
  const tabs = ["Income", "Expenses", "Combined"];

  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  console.log(selectedTab);

  return (
    <Container>
      <List>
        {tabs.map((item) => (
          <ListItem
            key={item}
            className={item === selectedTab ? "selected" : ""}
            onClick={() => setSelectedTab(item)}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default IENav;
