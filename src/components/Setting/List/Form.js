import React, { Component } from "react";
import { uuid as genID } from "uuidv4";

import s from "./s.module.css";
import c from "../../../config.json";

class Form extends Component {
  state = {
    id: "",
    topic: "",
    json: "",
    group: 0,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  hendleChangeSelect = (e) => {
    // const name = e.target.name;
    const value = e.target.options.selectedIndex;
    // const text = e.target.value;

    this.setState({ group: value });
    // this.setState({ selector: { name, value, text } });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { topic, json, group } = this.state;

    if (group == "0") {
      window.alert(c.setting.list.form.alert)
      return true
    }

    const info = { id: genID(), topic, json, group };

    this.props.mqtt.filter((w) => w.topic.toLowerCase() == topic.toLowerCase())
      .length == 0
      ? this.props.add(info)
      : window.alert(c.setting.list.form.alert);

    this.setState({
      id: "",
      topic: "",
      json: "",
      group: 0,
    });
  };

  render() {
    const { state, handleChange, handleSubmit, hendleChangeSelect } = this;
    const { topic, json, group } = state;
    return (
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          value={topic}
          onChange={handleChange}
          type="text"
          name="topic"
          autoComplete="off"
          required
        />
        <input
          value={json}
          onChange={handleChange}
          type="text"
          name="json"
          autoComplete="off"
          required
        />
        <select
          name="group"
          onChange={hendleChangeSelect}
          value={group-1}
          required
        >
          <option defaultValue="" hidden selected>
            {c.setting.users.form.select_title}
          </option>
          {c.setting.list.form.select.map((e, i) => {
            return (
              <option required key={i} defaultValue={i + 1}>
                {e}
              </option>
            );
          })}
        </select>
        <button>{c.setting.list.form.button}</button>
      </form>
    );
  }
}

export default Form;
