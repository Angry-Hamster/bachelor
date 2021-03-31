import React, { Component } from "react";
import Form from "./Form";
import Item from "./Item";

import s from "./s.module.css";
import c from "../../../config.json";

class List extends Component {
  state = {
    list: [
    ],
  };

  handleDelete = (name) => {
    const result = this.state.list.filter(e => {
      return e.name !== name
    })

    this.setState({ list: result });

    this.props.get(result)
  };

  handleAdd = (e) => {
    this.setState(prevState => {
      return { list: [...prevState.list, e] };
    });

    this.props.get([...this.state.list, e])
  }

  // componentDidUpdate(prevProps, prevState) {
  //   return prevState.list !== this.state.list
  // }

  render() {
    const { handleDelete, handleAdd } = this
    return (
      <div className={s.box}>
        <h2>{c.setting.users.list}</h2>
        <ul className={s.list_ul}>
          {this.state.list.map((elem) => {
            return <Item key={elem.name} delete={handleDelete} info={elem} style={s}/>;
          })}
        </ul>
        <Form users={this.state.list} add={handleAdd} style={s}/>
      </div>
    );
  }
}

export default List;
