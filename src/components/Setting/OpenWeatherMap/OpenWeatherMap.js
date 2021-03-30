import React, { Component } from "react";

import s from "./openWeatherMap.module.css";
import c from "../../../config.json";

class OpenWeatherMap extends Component {
  state = { key: "", citiId: "" };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { state, handleChange, handleSubmit } = this;
    const { key, citiId } = state;
    return (
      <form className={s.form} onSubmit={handleSubmit}>
        <h2>{c.setting.openWeatherMap.title}</h2>
        <input
          value={key}
          type="text"
          name="key"
          onChange={handleChange}
          required
          placeholder={c.setting.openWeatherMap.placeholder1}
        />
        <input
          value={citiId}
          type="text"
          name="citiId"
          onChange={handleChange}
          required
          placeholder={c.setting.openWeatherMap.placeholder2}
        />
        <button>{c.setting.openWeatherMap.button_submit}</button>
      </form>
    );
  }
}

export default OpenWeatherMap;
