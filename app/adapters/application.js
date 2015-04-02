import DS from 'ember-data';
import config from 'meme-generator/config/environment';

export default DS.RESTAdapter.extend({
  headers: {}
});