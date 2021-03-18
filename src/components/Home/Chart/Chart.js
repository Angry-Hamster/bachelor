import React, { Component } from 'react';
import s from './chart.module.css'

class Chart extends Component {
  state = {  }
  render() {
    return (
      <div className={s.chart_box}>
        I`m Chart
      </div>
     );
  }
}

export default Chart;