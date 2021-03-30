import React, { Component } from "react";
import { uuid as genID } from "uuidv4";

import close from "../../../image/close.svg";

import s from "./s.module.css";
import c from "../../../config.json";

class Main extends Component {
  state = {
    items: [],
    info: {
      timeStart: "",
      temp: "",
    },
  };

  post = () => {
    if (!this.state.items.length) {
      window.alert(c.setting.time_temp.alert);
      return true;
    }

    // ! POST
    fetch("/api/addTemps", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // ! TOKEN
      },
    })

    return true;
  };

  addItem = (e) => {
    e.preventDefault();

    const { timeStart, temp } = this.state.info;

    if (
      this.state.items.filter(
        (w) => w.timeStart.toLowerCase() == timeStart.toLowerCase(),
      ).length == 0
    ) {
      let timeItem = timeStart.split(":");
      let t = Number(timeItem[0]) * 60 + Number(timeItem[1]);
      const item = { timeStart, temp, id: genID(), t };

      let items = [...this.state.items];

      items.push(item);

      items.sort((a, b) => a.t - b.t);

      this.setState({ items });
    } else {
      window.alert(c.setting.time_temp.alert);
    }

    this.setState({ info: { timeStart: "", temp: "" } });
  };

  chage = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      return { info: { ...prevState.info, [name]: value } };
    });
  };

  handleDelete = (e) => {
    const result = this.state.items.filter((i) => {
      return i.id !== e.target.id;
    });

    this.setState({ items: result });
  };

  render() {
    const { addItem, chage, handleDelete, post } = this;
    const { timeStart, temp } = this.state.info;
    const disable = timeStart != "" && temp != "";

    return (
      <>
        <h2 className={s.title}>Fuck you</h2>

        <ul className={s.list}>
          {this.state.items.map((e) => {
            return (
              <li key={e.id}>
                <div>
                  <span>{e.timeStart}</span>
                </div>
                <div>
                  <span>{e.temp}&deg;C</span>
                </div>
                <input
                  className={s.close}
                  type="image"
                  src={close}
                  alt=""
                  id={e.id}
                  onClick={handleDelete}
                />
              </li>
            );
          })}
        </ul>

        <form onSubmit={addItem} className={s.form}>
          <input
            type="time"
            name="timeStart"
            onChange={chage}
            value={timeStart}
            required
          />
          <input
            type="number"
            name="temp"
            onChange={chage}
            max="30"
            min="15"
            value={temp}
            placeholder={c.setting.time_temp.placeholder}
            required
          />

          <button type="submit" disabled={!disable}>
          {c.setting.time_temp.button_add}
          </button>
        </form>

        <button onClick={post} className={s.submit}>
        {c.setting.time_temp.button_submit}
        </button>
      </>
    );
  }
}

export default Main;
