import React from 'react';

import List from "../components/Setting/List/List";

import s from "./css/setting.module.css";

export const Setting = () => {
  return(
    <div>
      <div className={s.info}>
        <h2>network mqtt</h2>

        <div>
          <List />
        </div>

        <div>??</div>

        <div>openWeatherMap</div>
      </div>
    </div>
  )
}