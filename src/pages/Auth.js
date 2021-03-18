import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/messege.hook";
import { AuthContext } from "../context/AuthContext";
import s from "./css/auth.module.css";
import c from "../config.json";

export const Auth = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  // useEffect(() => {
  //   window.M.updateTextFields();
  // }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request("/auth/login", "POST", { ...form });
      auth.login(data.token, data.userStatus);
    } catch (e) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <label htmlFor="login">{c.auth.input_name}</label>
        <input
          id="login"
          name="login"
          type="text"
          required
          autoComplete="off"
          value={form.name}
          onChange={changeHandler}
        />

        <label htmlFor="password">{c.auth.input_pass}</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="off"
          value={form.password}
          onChange={changeHandler}
        />

        <button type="submit" onClick={loginHandler} disabled={loading}>
          {c.auth.button_login}
        </button>
      </form>
    </div>
  );
};
