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
      multiplay: "",
    },
    post: {},
  };

  post = () => {
    if (!this.state.items.length) {
      window.alert(c.setting.multiply.alert);
      return true;
    }

    // ! POST

    return true;
  };

  addItem = (e) => {
    e.preventDefault();

    const { time, multiplay } = this.state.info;

    if (
      this.state.items.filter((w) => w.time.toLowerCase() == time.toLowerCase())
        .length == 0
    ) {
      let timeItem = time.split(":");
      let t = Number(timeItem[0]) * 60 + Number(timeItem[1]);
      const item = { time, multiplay, id: genID(), t };

      let items = [...this.state.items];

      items.push(item);

      items.sort((a, b) => a.t - b.t);

      this.setState({ items });
    } else {
      window.alert(c.setting.multiply.alert);
    }

    this.setState({ info: { time: "", multiplay: "" } });
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
    const { time, multiplay } = this.state.info;
    const disable = time != "" && multiplay != "";

    return (
      <>
        <h2 className={s.title}>Fuck you</h2>
        <ul className={s.list}>
          {this.state.items.map((e) => {
            return (
              <li key={e.id}>
                <span>{e.time}</span>
                <span>{e.multiplay}</span>
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
            name="multiplay"
            onChange={chage}
            max="3"
            min="0"
            step="0.01"
            value={multiplay}
            placeholder={c.setting.multiply.placeholder}
            required
          />

          <button type="submit" disabled={!disable}>
            {c.setting.multiply.button_add}
          </button>
        </form>

        <button onClick={post} className={s.submit}>
        {c.setting.multiply.button_submit}
        </button>
      </>
    );
  }
}

export default Main;
