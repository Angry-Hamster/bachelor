import React, { Component } from "react";

import s from "./cards.module.css";

class Cards extends Component {
  state = {};
  render() {
    // console.log(this.props.children);
    return (
      <div>
        {this.props.children.map((item, i) => {
          return (<div key={i} className={s.box}>{item}</div>);
        })}
      </div>
    );
  }
}

export default Cards;
