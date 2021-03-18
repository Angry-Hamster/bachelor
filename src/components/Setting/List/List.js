import React, { Component } from "react";

class List extends Component {
  state = {};

  render() {
    return (
      <>
        <ul>
          <li><input type="text"/><button>add</button></li>
        </ul>
      </>
    );
  }
}

export default List;
