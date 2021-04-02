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
    name: "",
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
      auth.login(data.token, data.userStatus, data.userName);
    } catch (e) {
      window.alert(e)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <label htmlFor="name">{c.auth.input_name}</label>
        <input
          id="name"
          name="name"
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
