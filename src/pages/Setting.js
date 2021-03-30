import React from "react";

import List from "../components/Setting/List/List";
import Cards from "../components/Setting/Cards/Cards";
import OpenWeatherMap from "../components/Setting/OpenWeatherMap/OpenWeatherMap";
import UserList from "../components/Setting/Users/List";
import Main from "../components/Setting/TimeTemp/Main";
import Multiply from "../components/Setting/Multiply/Multiply";

import s from "./css/setting.module.css";
import c from "../config.json"

export const Setting = () => {
  return (
    <div className={s.main}>
      <div className={s.info}>
        <h2>
          {c.setting.title[0]}
          <br /> {c.setting.title[1]}
        </h2>

        <div>
          <List />
        </div>
      </div>

      <Cards>
        <Main />
        <Multiply />
        <UserList />
        <OpenWeatherMap />
      </Cards>
    </div>
  );
};
