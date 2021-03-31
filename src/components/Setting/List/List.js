import React, { Component } from "react";
import Form from "./Form";
import ListItem from "./ListItem";

import s from "./s.module.css";

class List extends Component {
  state = {
    list: [
    ],
  };

  handleDelete = (id) => {
    const result = this.state.list.filter(e => {
      return e.id !== id
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
      <>
        <ul className={s.list_ul}>
          {this.state.list.map((elem) => {
            return <ListItem key={elem.id} delete={handleDelete} info={elem} style={s}/>;
          })}
        </ul>
        <Form mqtt={this.state.list} add={handleAdd}/>
      </>
    );
  }
}

export default List;
