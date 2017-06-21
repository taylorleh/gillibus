/**
 * Created by taylor on 6/17/17.
 */
import api from 'api/admin';
import {rules} from '../../util/priceBuilderUtils';

const state = {
  rules: [


    {
      type: 'checkbox',
      id: 'bus-id',
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
      id: 'block-id',
      operators: ['=', '<>'],
      choices: [
        { label: 'Day', value: 'Day' },
        { label: 'Night', value: 'Night' }
      ]
    },
    {
      type: 'numeric',
      id: 'duration-id',
      label: 'Duration',
      operators: ['=', '<>', '<', '<=', '>', '>='],
      choices: [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
        { label: 5, value: 5 },
        { label: 6, value: 6 },
        { label: 7, value: 7 }
      ]
    }

  ]
};

const mutations = {
  'SET_RULES' () {

  }
};

const actions = {
  getRules() {

  }

};

const getters = {
  getRules: state => state.rules
};

export default {
    state,
    getters,
    mutations,
    actions
};
