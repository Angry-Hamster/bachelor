import React, { Component } from "react";
import Chart from "../components/Home/Chart/Chart";
import Container from "../components/Home/Container/Container";
import Temp from "../components/Home/Temp/Temp";
import Time from "../components/Home/Time/Time";

import s from "./css/home.module.css";
import c from "../config.json";
import style_price from "./css/price.module.css";

class Home extends Component {
  state = {
    temp: [0, 0],
    price: {current: 0},
  };

  setTemp = () => {
    fetch("/data", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((temp) => {
        this.setState({ temp });
      });
    });
  };

  setPrice = () => {
    fetch("/api/tariff", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((price) => {
        this.setState({
          price: {
            tariff: price.tariff,
            multiplier: price.multiplier,
            current: price.current,
          },
        });
      });
    });
  };

  getColorForPrice = (multiplier) => {
    if (multiplier < 0.6) {
      return "green";
    } else if (multiplier < 1.1) {
      return "#ebd234";
    } else {
      return "red";
    }
  };

  getColorForTemp = (d) => {
    d = Math.abs(d);
    if (d < 1) {
      return "green";
    } else if (d < 2) {
      return "#ebd234";
    } else {
      return "red";
    }
  };

  getInfo = () => {
    this.setTemp();
    this.setPrice();
  };

  componentDidMount() {
    this.getInfo();
    setInterval(this.getInfo, 15000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState == this.state) {
      return true;
    }
  }

  componentWillUnmount() {
    clearInterval(this.getInfo);
  }

  render() {
    const { temp } = this.state;
    return (
      <div className={s.app}>
        <div className={s.box}>
          <div className={s.temp_box}>
            <Temp temp={temp[0]} name={c.home.temp_1} />
            <Temp
              temp={temp[1]}
              name={c.home.temp_2}
              color={this.getColorForTemp(temp[0] - temp[1])}
            />
          </div>

          <div className={s.chart_box}>
            <Chart name={c.home.chart} />
          </div>
        </div>

        <div className={s.info_box}>
          <Time />
          <Container>
            <p className={style_price.head}>{c.home.container.head}</p>
            <div className={style_price.box}>
              <h1
                style={{
                  color: this.getColorForPrice(this.state.price.multiplier),
                }}
                className={style_price.price}
              >
                {this.state.price.current}
              </h1>
              <p>{c.home.container.currency}</p>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
