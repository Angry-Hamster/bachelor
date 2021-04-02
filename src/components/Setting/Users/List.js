import React, { Component } from "react";
import Form from "./Form";
import Item from "./Item";

import s from "./s.module.css";
import c from "../../../config.json";

class List extends Component {
  state = {
    oldUser: [],
    list: [],
    status: this.props.status,
  };

  getUser = () => {
    fetch("/auth/user", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((users) => {
        this.setState({ oldUser: users });
      });
    });
  };

  componentDidMount() {
    this.getUser();
  }

  handleDelete = (name) => {
    if (name == this.props.name) {
      return window.alert(c.setting.users.list.alert)
    }

    const result = this.state.list.filter((e) => {
      return e.name !== name;
    });

    this.setState({ list: result });
    this.props.get(result);

    if (!result.length) {
      const user = this.state.oldUser.filter((e) => {
        return e.name !== name;
      });

      this.setState({ oldUser: user });
      this.props.remove(name);
    }
  };

  handleAdd = (e) => {
    this.props.get(e);
    this.setState((prevState) => {
      return { list: [...prevState.list, e] };
    });

  };

  render() {
    const { handleDelete, handleAdd } = this;
    const { list, oldUser } = this.state;

    let allList = [];
    allList.push(...oldUser, ...list);

    if (this.state.status == 1) {
      return (
        <div className={s.box}>
        <h2>{c.setting.users.list.title}</h2>
        <ul className={s.list_ul}>
          {allList.map((elem) => {
            return (
              <Item
                key={elem.name}
                delete={handleDelete}
                info={elem}
                style={s}
              />
            );
          })}
        </ul>
        <Form users={allList} add={handleAdd} style={s} />
      </div>
      );
    } else {
      return (
        <h2>{c.setting.users.noGood}</h2>
      )
    }

  }
}

export default List;
