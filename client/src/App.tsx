import React, { useState } from "react";
import { Navigation } from "./components";
import {
  Welcome,
  Login,
  Signup,
  Home,
  Income,
  Expenses,
  Combined,
  Budget,
  ErrorPage,
} from "./pages";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // State to keep track of whether a user is logged in or not
  const [user, setUser] = useState<boolean>(true);

  return (
    <div className="App">
      <Router>
        <Navigation user={user} setUser={setUser} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              {/* USING NESTED ROUTES  */}
              <Route path="budget" element={<Budget />}>
                <Route index element={<Income />} />
                <Route path="income" element={<Income />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="combined" element={<Combined />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
