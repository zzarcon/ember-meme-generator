import Ember from 'ember';
import config from 'meme-generator/config/environment';

export default Ember.Route.extend({
  setupController: function(controller) {
    var id = 0;
    var dependencies = [{
      endpoint: 'images',
      property: 'memeTypes'
    }, {
      endpoint: 'fonts',
      property: 'fonts'
    }];

    dependencies.forEach(function(dependency) {
      Ember.$.get(config.apiHost + '/' + dependency.endpoint).then(function(response) {
        response.sort();

        response = response.map(function(text) {
          id++;

          return {
            id: id,
            text: text,
            description: "",
          };
        });
        controller.set(dependency.property, response);
      });
    });
  }
});