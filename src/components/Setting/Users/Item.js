import React, { Component } from "react";

import close from "../../../image/close.svg";

class ListItem extends Component {
  state = {
    info: this.props.info,
  };

  handleClick = () => {
    let name = this.state.info.name;
    this.props.delete(name);
  };

  render() {
    const { state, handleClick } = this;
    const { name, status } = state.info;
    return (
      <li className={this.props.style.item}>
        <div>
          <div>
            <span>{name}</span>
          </div>
          <div>
            <span>{status}</span>
          </div>
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
