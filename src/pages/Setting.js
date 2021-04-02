import React, { Component, useContext } from "react";

import List from "../components/Setting/List/List";
import Cards from "../components/Setting/Cards/Cards";
import OpenWeatherMap from "../components/Setting/OpenWeatherMap/OpenWeatherMap";
import UserList from "../components/Setting/Users/List";
import Main from "../components/Setting/TimeTemp/Main";
import Multiply from "../components/Setting/Multiply/Multiply";

import s from "./css/setting.module.css";
import c from "../config.json";
import { AuthContext } from "../context/AuthContext";

const request = async (url, method = "GET", body = null, headers = {}) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, { method, body, headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something was wrong");
    }
    return data;
  } catch (e) {}
};
const Setting = () => {
  const { token, userStatus, userName } = useContext(AuthContext);

  // todo POST
  const setList = (e) => {
      console.log(e);
      request("/api/addMqtts", "POST", e, {
        Authorization: `Bearer ${token}`,
      });
    },
    deleteUser = (e) => {
      console.log(e);
      request("/auth/delUser", "POST", {name: e}, {
        Authorization: `Bearer ${token}`,
      });
    },
    setMain = (e) => {
      console.log(e);
      request("/api/addTemps", "POST", e, {
        Authorization: `Bearer ${token}`,
      });
    },
    setMultiply = (e) => {
      console.log(e);
      request("/api/addMultipliers", "POST", e, {
        Authorization: `Bearer ${token}`,
      });
    },
    setUsers = (e) => {
      if (e.length == 0) {
        return;
      }
      console.log(e);
      request("/auth/addUser", "POST", e, {
        Authorization: `Bearer ${token}`,
      });
    },
    setKey = (e) => {
      // console.log(e);
      request("/test", "POST", e, {
        Authorization: `Bearer ${token}`,
      });
    };

  return (
    <div className={s.main}>
      <div className={s.info}>
        <h2>
          {c.setting.title[0]}
          <br /> {c.setting.title[1]}
        </h2>

        <div>
          <List get={setList} />
        </div>
      </div>

      <Cards>
        <Main get={setMain} />
        <Multiply get={setMultiply} />
        <UserList
          get={setUsers}
          remove={deleteUser}
          status={userStatus}
          name={userName}
        />
        <OpenWeatherMap get={setKey} />
      </Cards>
    </div>
  );
};

export default Setting;
