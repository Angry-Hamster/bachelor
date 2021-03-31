import React, { Component } from "react";

import close from "../../../image/close.svg";
import c from "../../../config.json";

class ListItem extends Component {
  state = {
    info: this.props.info,
  };

  handleClick = () => {
    let id = this.state.info.id;
    this.props.delete(id);
  };

  render() {
    const { state, handleClick } = this;
    const { topic, json, group } = state.info;
    return (
      <li>
        <div>
          <p>{topic}</p>
          <p>{json}</p>
          <p>{c.setting.list.form.select[group-1]}</p>
        </div>
        <input
          className={this.props.style.close}
          onClick={handleClick}
          type="image"
          src={close}
        />
      </li>
    );
  }
}

export default ListItem;
