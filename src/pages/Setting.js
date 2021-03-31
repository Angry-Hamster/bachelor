import React, { Component } from 'react';

import List from "../components/Setting/List/List";
import Cards from "../components/Setting/Cards/Cards";
import OpenWeatherMap from "../components/Setting/OpenWeatherMap/OpenWeatherMap";
import UserList from "../components/Setting/Users/List";
import Main from "../components/Setting/TimeTemp/Main";
import Multiply from "../components/Setting/Multiply/Multiply";

import s from "./css/setting.module.css";
import c from "../config.json"

class Setting extends Component {
  state = {  }

  getList = (e) => {
    console.log(e);
  }

  getMain = (e) => {
    console.log(e);
  }

  getMultiply = (e) => {
    console.log(e);
  }

  getUsers = (e) => {
    console.log(e);
  }

  getKey = (e) => {
    console.log(e);
  }

  render() {
    const { getList, getMain, getMultiply, getUsers, getKey } = this
    return (
      <div className={s.main}>
      <div className={s.info}>
        <h2>
          {c.setting.title[0]}
          <br /> {c.setting.title[1]}
        </h2>

        <div>
          <List get={getList}/>
        </div>
      </div>

      <Cards>
        <Main get={getMain}/>
        <Multiply get={getMultiply}/>
        <UserList get={getUsers}/>
        <OpenWeatherMap get={getKey}/>
      </Cards>
    </div>
     );
  }
}

export default Setting;