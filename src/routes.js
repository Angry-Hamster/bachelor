import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Auth } from "./pages/Auth";
import  Home  from "./pages/Home";
import { Setting } from "./pages/Setting";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>

        <Route path="/setting" exact>
          <Setting />
        </Route>

        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
};
