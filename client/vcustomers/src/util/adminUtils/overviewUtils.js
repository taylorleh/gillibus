/**
 * Created by taylor on 6/22/17.
 */
import moment from 'moment';
import _ from 'lodash';
let chartOptions = {
  maintainAspectRatio: false,
  lineTension: 0,
  borderJoinStyle: 'miter',
  backgroundColor: 'white',
  tooltips: {
    enabled: false
  },
  legend: {
    display: false
  },
  title: {
    display: false,
    text: 'HELLO'
  },
  layout: {
    padding: 5
  },
  elements: {
    line: {
      tension: 0,
      backgroundColor: 'rgba(244, 211, 180, 1)',
      borderColor: 'rgb(222, 99, 65)'
    }
  },
  scales: {
    yAxes: [{
      stacked: true,
      gridLines: {
        display: true,
        color: "rgb(179, 179, 179)"
      },
      ticks: {
        min: 0
      }
    }],
    xAxes: [{
      gridLines: {
        display: true,
        color: 'rgb(179, 179, 179)'
      }
    }]
  }
};

const digitsRE = /(\d{3})(?=\d)/g;

export const formatMonies = (value, sign) => {
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) {
    return '';
  }
  sign = sign || '$';
  var s = Math.floor(Math.abs(value)).toString(),
    i = s.length % 3,
    h = i > 0
      ? (s.slice(0, i) + (s.length > 3 ? ',' : ''))
      : '',
    v = Math.abs(parseInt((value * 100) % 100, 10)),
    f = '.' + (v < 10 ? ('0' + v) : v);
  return (value < 0 ? '-' : '') +
    sign + h + s.slice(i).replace(digitsRE, '$1,') + f
};

export const serializeCharges = (charges) => {
  return charges.map(charge => {
    let purchased = moment.unix(charge.created);

    console.log(`purchased ${purchased}`);
    charge.purchased = purchased.format("dddd, MMMM Do");
    charge.total = formatMonies(charge.amount / 100);
    return charge;
  })
};


export const generateWeekLabels = (base = moment()) => {
  let empty = new Array(7).fill(0);
  let output = empty.map((item, index, arr) => {
    return moment().subtract(index, 'day').format('M/D');
  });
  return output.reverse();
};

export const generateChartData = (weeklySales) => {
  let copy = _.cloneDeep(chartOptions);
  copy.scales.yAxes[0].ticks.max = weeklySales;
  return copy;
};

