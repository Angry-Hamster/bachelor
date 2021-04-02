import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navigations/Nav";

function App() {
  const {
    token,
    login,
    logout,
    userStatus,
    userName,
  } = useAuth();

  let isAuthenticated = !!token;
  // isAuthenticated = true //!!

  const routes = useRoutes(isAuthenticated, userStatus);

  return (
    <AuthContext.Provider
      value={{
        token,
        userName,
        userStatus,
        login,
        logout,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
