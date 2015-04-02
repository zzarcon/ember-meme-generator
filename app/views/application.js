import Ember from 'ember';

export default Ember.View.extend({
  setupEvents: function() {
    var controller = this.get('controller');

    this.$('#download-img').on('click', function() {
      this.href = controller.get('memeSrc');
    });
  }.on('didInsertElement')
});