/**
 * Created by taylor on 6/22/17.
 */
import moment from 'moment';
const digitsRE = /(\d{3})(?=\d)/g;

const formatMonies = (value, sign) => {
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
  console.log('OUTPUT', output);
  return output.reverse();

};

// export const addErrorMessage = (dispatch, error) => {
//
// }
