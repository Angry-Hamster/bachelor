import React, { Component } from "react";
import c from "../../../config.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import s from "./chart.module.css";

class Chart extends Component {
  state = {
    data: [
      {name: "00:00", temp: 20, tempSet: 20},
      {name: "00:00", temp: 20, tempSet: 20}
    ],
  };

  setChart = () => {
    fetch("/grapfic", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        this.setState({ data });
      });
    });
  };

  componentDidMount() {
    this.setChart();
    setInterval(this.setChart, 5000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState == this.state) {
      return true;
    }
  }

  componentWillUnmount() {
    clearInterval(this.setChart);
  }

  maxValue = (data) => {
    return Math.round(
      Math.max(
        data.reduce((acc, curr) =>
          acc.temp > curr.temp ? acc : curr,
        ).temp,
        this.state.data.reduce((acc, curr) =>
          acc.tempSet > curr.tempSet ? acc : curr,
        ).tempSet,
      ),
    );
  };

  minValue = (data) => {
    return Math.round(
      Math.min(
        data.reduce((acc, curr) =>
          acc.temp < curr.temp ? acc : curr,
        ).temp,
        this.state.data.reduce((acc, curr) =>
          acc.tempSet < curr.tempSet ? acc : curr,
        ).tempSet,
      ),
    );
  };

  render() {
    const { temp, setTemp } = c.home.chart;
    const { state, maxValue, minValue } = this;
    const { data } = state;

    const bottom = minValue(data) - 2,
      top = maxValue(data) + 2;
    return (
      <div className={s.chart_box}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 15,
              right: 15,
              left: -15,
              bottom: -5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: "15px" }} />

            <YAxis tick={{ fontSize: "15px" }} domain={[bottom, top]} />

            <Tooltip wrapperStyle={{ fontSize: "25px" }} />
            <Legend height={36} wrapperStyle={{ fontSize: "22px" }} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name={temp}
            />
            <Line
              type="monotone"
              dataKey="tempSet"
              name={setTemp}
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart;
