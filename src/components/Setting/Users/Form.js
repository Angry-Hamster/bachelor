import React, { Component } from "react";

import c from "../../../config.json";

class Form extends Component {
  state = { name: "", status: "" };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, status } = this.state;
    const info = { name, status };

    this.props.users.filter((w) => w.name.toLowerCase() == name.toLowerCase()).length == 0
    ? this.props.add(info)
    : window.alert('Fuck you')

    this.setState({ name: "", status: "" });
  };

  render() {
    const { state, handleChange, handleSubmit } = this;
    const { name, status } = state;
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
          value={status}
          onChange={handleChange}
          type="text"
          name="status"
          autoComplete="off"
          required
          placeholder={c.setting.users.form.placeholder2}
        />
        <button>{c.setting.users.form.button_submit}</button>
      </form>
    );
  }
}

export default Form;
