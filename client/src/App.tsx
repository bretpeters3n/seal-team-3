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
} from "./pages";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      setUser(true);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigation user={user} setUser={setUser} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              {/* USING NESTED ROUTES  */}
              <Route path="budget/:budgetId" element={<Budget />}>
                <Route
                  path="transactions"
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
  );
}

export default App;
