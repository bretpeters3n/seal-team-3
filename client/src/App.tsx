import React, { useEffect, useState } from "react";
import { Navigation } from "./components";
import {
  Welcome,
  Login,
  Signup,
  Home,
  Transactions,
  Budget,
  ErrorPage,
  BudgetMain,
} from "./pages";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<boolean>(false);
  const [displayLoader, setDisplayLoader] = useState<boolean>(true);

  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      setUser(true);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <Navigation
            user={user}
            setUser={setUser}
            setDisplayLoader={setDisplayLoader}
          />
          <Routes>
            {user ? (
              <>
                <Route
                  path="/"
                  element={
                    <Home
                      displayLoader={displayLoader}
                      setDisplayLoader={setDisplayLoader}
                    />
                  }
                />
                {/* USING NESTED ROUTES  */}
                <Route path="budget/:budgetId" element={<Budget />}>
                  <Route index element={<BudgetMain />} />
                  <Route
                    path="income"
                    element={<Transactions pageType="income" />}
                  />
                  <Route
                    path="expenses"
                    element={<Transactions pageType="expense" />}
                  />
                  <Route path="*" element={<ErrorPage />} />
                </Route>
              </>
            ) : (
              <>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
              </>
            )}
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
