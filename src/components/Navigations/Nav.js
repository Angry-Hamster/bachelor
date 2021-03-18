import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import s from "./nav.module.css";
import c from "../../config.json";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <div className={s.main}>
      <NavLink className={s.link} to="/home">
        {c.navigation.toHome}
      </NavLink>
      <NavLink className={s.link} to="/setting">
        {c.navigation.toSetting}
      </NavLink>
      <a href="/" onClick={logoutHandler}>
        {c.navigation.Exit}
      </a>
    </div>
  );
};
