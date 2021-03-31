import React, { Component } from "react";
import { uuid as genID } from "uuidv4";

import close from "../../../image/close.svg";

import s from "./s.module.css";
import c from "../../../config.json";

class Main extends Component {
  state = {
    items: [],
    info: {
      time: "",
      temp: "",
    },
  };

  addItem = (e) => {
    e.preventDefault();
    let { time, temp } = this.state.info;

    let arr = time.split(":");
    time = Number(arr[0]) * 60 + Number(arr[1]);

    if (this.state.items.filter((w) => w.time == time).length) {
      window.alert(c.setting.time_temp.alert);
    } else {
      let items = [...this.state.items];
      items.push({ time, temp: Number(temp), id: genID() });
      items.sort((a, b) => a.time - b.time);

      this.setState({ items });

      this.props.get(items);
    }

    this.setState({ info: { time: "", temp: "" } });
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
    this.props.get(result);
  };

  getTime = (t) => {
    let minute = t % 60;
    let hour = (t - minute) / 60;

    if (minute < 10) {
      minute = `0${minute}`;
    }

    if (hour < 10) {
      hour = `0${hour}`;
    }

    return `${hour}:${minute}`;
  };

  render() {
    const { addItem, chage, handleDelete, getTime } = this;
    const { time, temp } = this.state.info;
    const disable = time != "" && temp != "";

    return (
      <>
        <h2 className={s.title}>{c.setting.time_temp.title}</h2>

        <ul className={s.list}>
          {this.state.items.map((e) => {
            return (
              <li key={e.id}>
                <div>
                  <span>{getTime(e.time)}</span>
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
            name="time"
            onChange={chage}
            value={time}
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
      </>
    );
  }
}

export default Main;
