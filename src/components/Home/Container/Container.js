import React, { Component } from 'react';
import s from "./container.module.css";

class Container extends Component {
  render() {
    return (
      <div className={s.box}>
        {this.props.children}
      </div>
     );
  }
}

export default Container;