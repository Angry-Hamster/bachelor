import React, { Component } from "react";

import close from "../../../image/close.svg";

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
    const { topic, json, selector } = state.info;
    return (
      <li>
        <div>
          <p>{topic}</p>
          <p>{json}</p>
          <p>{selector.text}</p>
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
