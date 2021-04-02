import React, { Component } from "react";

import c from "../../../config.json";

class Form extends Component {
  state = {
    name: "",
    password: "",
    status: 0,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  hendleChangeSelect = (e) => {
    const value = e.target.options.selectedIndex;

    this.setState({ status: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.status) {
      window.alert(c.setting.users.form.alert)
      return true
    }

    const { name, password, status } = this.state;
    const info = { name, password, status };

    this.props.users.filter((w) => w.name.toLowerCase() == name.toLowerCase())
      .length == 0
      ? this.props.add(info)
      : window.alert(c.setting.users.form.alert);

    this.setState({ name: "", password: "", status: ""});
  };

  render() {
    const { state, handleChange, handleSubmit, hendleChangeSelect } = this;
    const { name, password, status } = state;
    return (
      <form onSubmit={handleSubmit} className={this.props.style.form}>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          autoComplete="off"
          required
          placeholder={c.setting.users.form.placeholder1}
        />
        <input
          value={password}
          onChange={handleChange}
          type="text"
          name="password"
          autoComplete="off"
          required
          placeholder={c.setting.users.form.placeholder2}
        />
        <select
          name="status"
          onChange={hendleChangeSelect}
          value={status}
          required
        >
          <option value="" hidden selected>
            {c.setting.users.form.select_title}
          </option>
          {c.setting.users.form.select.map((e, i) => {
            return (
              <option required key={i} value={i + 1}>
                {e}
              </option>
            );
          })}
        </select>
        <button>{c.setting.users.form.button_submit}</button>
      </form>
    );
  }
}

export default Form;
