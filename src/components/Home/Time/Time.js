import React, { Component } from "react";
import s from "./time.module.css";

class Time extends Component {
  state = { hours: "00", minutes: "00" };

  getTime = () => {
    const ms_time = new Date(Date.now());
    let hours = ms_time.getHours();
    let minutes = ms_time.getMinutes();

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    this.setState({ hours });
    this.setState({ minutes });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState == this.state) {
      return true;
    }
  }

  componentDidMount() {
    this.getTime();
    setInterval(this.getTime, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.getTime);
  }

  render() {
    const { hours, minutes } = this.state;
    return (
      <div className={s.time_box}>
        <h2>
          {hours}:{minutes}
        </h2>
      </div>
    );
  }
}

export default Time;
