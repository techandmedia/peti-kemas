import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'Jan',

    pv: 39,
    amt: 150,
  },
  {
    name: 'Feb',

    pv: 0,
    amt: 0,
  },
  {
    name: 'Mar',

    pv: 0,
    amt: 0,
  },
  {
    name: 'Apr',

    pv: 0,
    amt: 0,
  },
  {
    name: 'Mei',

    pv: 0,
    amt: 0,
  },
  {
    name: 'Jun',

    pv: 0,
    amt: 0,
  },
  {
    name: 'Jul',

    pv: 0,
    amt: 0,
  },
  {
    name: 'Agu',

    pv: 0,
    amt: 0,
  },
  {
    name: 'Sep',

    pv: 0,
    amt: 0,
  },
  {
    name: 'Okt',

    pv: 0,
    amt: 0,
  },
  {
    name: 'Nov',

    pv: 0,
    amt: 0,
  },
  {
    name: 'Des',

    pv: 0,
    amt: 50,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='pv' fill='#8884d8'/>
      </BarChart>
    );
  }
}
