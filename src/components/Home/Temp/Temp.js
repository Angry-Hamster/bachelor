import React, { Component } from "react";
import s from "./temp.module.css";

class Temp extends Component {
  render() {
    const { temp, name } = this.props;
    return (
      <div className={s.temp_box}>
        <p>{name}</p>
        <h2 style={{ color: this.props.color }}>
          {Number(temp).toFixed(1)} &deg;C
        </h2>
      </div>
    );
  }
}

Temp.defaultProps = {
  temp: "??",
  name: "?!",
  color: "black",
};

export default Temp;
