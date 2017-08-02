/**
 * Created by taylor on 6/22/17.
 */

import Vue from 'vue';
import moment from 'moment';
let create = document.createElement.bind(document);

Vue.directive('format-date', {
  inserted: function (el) {
    console.log('FORMAT DATE', arguments);
  },

  update: function(el) {
    console.log('UPDATE', el);
  },

  componentUpdated(el) {
    console.log('COMP UPDATE', el.innerHTML);
  }
});

function walkTree(node, className) {
  let classes = node.classList;

  if(Array.prototype.indexOf.call(classes, className) > -1) {
    return node;
  } else if(node.parentNode) {
    return walkTree(node.parentNode, className);
  } else {
    return null;
  }
}


// input: ['div', ['p', 'p'], ['span', 'span']]
// output:
// <div>
//  <p><span></span></p>
//  <p><span></span></p>
// </div>

const createContainer = (definition, build = document.createElement('div'), ctx) => {
  let inner = definition.shift();

  if (Array.isArray(inner)) {
    console.log(`creating siblings ${inner}`);
    inner.forEach((el, i) => {
      let child = create(el);
      if(definition[0] && definition[i]) {
        return child.appendChild(createContainer(definition[i]));
      } else {
        return build.appendChild(child);
      }
    })
  } else if(inner) {
    build.appendChild(create(inner));
  }

  if(definition.length) {
    return createContainer(definition, build);
  }

  return build;

};


Vue.directive('dt-picker', {
  bind: function(el) {
    console.log('BINDING');
    let container = createContainer(['div']);
    console.log('container = ', container);
    el.addEventListener('click', (evt) => {
      let inputContainer = walkTree(evt.target, 'input-group');
      console.log('input container', inputContainer);
    })
  },
  inserted: function (el) {

  },

  update: function(el) {
    console.log('UPDATE', el);
  },

  componentUpdated(el) {
    console.log('COMP UPDATE', el.innerHTML);
  }
});
