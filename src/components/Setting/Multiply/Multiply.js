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
      multiplier: "",
    },
  };

  getmultiplier = () => {
    fetch("/api/multiplier", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((multiplier) => {
        this.setState({ items: multiplier.multiplier });
      });
    });
  };

  componentDidMount() {
    this.getmultiplier();
  }

  addItem = (e) => {
    e.preventDefault();
    let { time, multiplier } = this.state.info;

    let arr = time.split(":");
    time = Number(arr[0]) * 60 + Number(arr[1]);

    if (this.state.items.filter((w) => w.time == time).length) {
      window.alert(c.setting.multiplier.alert);
    } else {
      let items = [...this.state.items];
      items.push({ time, multiplier: Number(multiplier) });
      items.sort((a, b) => a.time - b.time);

      this.setState({ items });
      this.props.get(items);
    }

    this.setState({ info: { time: "", multiplier: "" } });
  };

  chage = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      return { info: { ...prevState.info, [name]: value } };
    });
  };

  handleDelete = (e) => {
    const result = this.state.items.filter((i) => {
      return i.time != e.target.id;
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
    const { time, multiplier } = this.state.info;
    const disable = time != "" && multiplier != "";

    return (
      <>
        <h2 className={s.title}>{c.setting.multiply.title}</h2>
        <ul className={s.list}>
          {this.state.items.map((e) => {
            return (
              <li key={e.time}>
                <div>
                  <span>{getTime(e.time)}</span>
                </div>
                <div>
                  <span>{e.multiplier}</span>
                </div>
                <input
                  className={s.close}
                  type="image"
                  src={close}
                  alt=""
                  id={e.time}
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
            name="multiplier"
            onChange={chage}
            max="3"
            min="0"
            step="0.01"
            value={multiplier}
            placeholder={c.setting.multiply.placeholder}
            required
          />

          <button type="submit" disabled={!disable}>
            {c.setting.multiply.button_add}
          </button>
        </form>
      </>
    );
  }
}

export default Main;
