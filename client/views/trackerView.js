

const TrackerView = Backbone.View.extend({

  el: '.content',

  template: '<span>HELLO</span>',

  initialize:function() {
    console.log('INIT VIEW');
  },

  render:function() {
    console.log('RENDERINH');
  }

});
