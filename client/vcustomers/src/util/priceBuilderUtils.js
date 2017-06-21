/**
 * Created by taylor on 6/17/17.
 */
import { busNames } from '../config';
console.log('bus names ', busNames);

const makeBusChoices = (names) => {
  return names.map(name => {
    return { label: name, value: name };
  })
};

export let rules = [

  {
    type: 'checkbox',
    label: 'Bus',
    operators: ['='],
    choices: [
      {
        label: "G3",
        value: "G3"
      },
      {
        label: "Charlie",
        value: "Charlie"
      },
      {
        label: "Gillibus",
        value: "Gillibus"
      },
      {
        label: "Starship",
        value: "Starship"
      }
    ]
  },
  {
    type: 'checkbox',
    label: 'Block',
    operators: ['=', '<>'],
    choices: [
      { label: 'Day', value: 'Day' },
      { label: 'Night', value: 'Night' }
    ]
  },
  {
    type: 'numeric',
    label: 'Duration',
    operators: ['=', '<>', '<', '<=', '>', '>='],
    choices: [
      makeBusChoices([0, 1, 2, 3, 4, 5, 6, 7, 8])
    ]
  }
];

