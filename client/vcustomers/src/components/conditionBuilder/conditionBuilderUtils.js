/**
 * Created by taylor on 6/17/17.
 */

export let ruleTypes = {
  "text": {
    operators: ['equals', 'contains', 'does not contain', 'is empty', 'is not empty', 'begins with', 'ends with'],
    inputType: "text",
    id: "text-field"
  },
  "numeric": {
    operators: ['=', '<>', '<', '<=', '>', '>='],
    inputType: "number",
    id: "number-field"
  },
  "custom": {
    operators: [],
    inputType: "text",
    id: "custom-field"
  },
  "radio": {
    operators: [],
    choices: [],
    inputType: "radio",
    id: "radio-field"
  },
  "checkbox": {
    operators: [],
    choices: [],
    inputType: "checkbox",
    id: "checkbox-field"
  },
  "category": {
    operators: ['=', '<>'],
    choices: [],
    inputType: "select",
    id: "category-field"
  }
}
