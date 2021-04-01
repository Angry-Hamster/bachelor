import React, { Component } from "react";

import c from "../../../config.json";

class Form extends Component {
  state = {
    name: "",
    password: "",
    group: 0,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  hendleChangeSelect = (e) => {
    const value = e.target.options.selectedIndex;

    this.setState({ group: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.group) {
      window.alert(c.setting.users.form.alert)
      return true
    }

    const { name, password, group } = this.state;
    const info = { name, password, group };

    this.props.users.filter((w) => w.name.toLowerCase() == name.toLowerCase())
      .length == 0
      ? this.props.add(info)
      : window.alert(c.setting.users.form.alert);

    this.setState({ name: "", password: "", group: ""});
  };

  render() {
    const { state, handleChange, handleSubmit, hendleChangeSelect } = this;
    const { name, password, group } = state;
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
          name="group"
          onChange={hendleChangeSelect}
          value={group}
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
