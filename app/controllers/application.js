import Ember from 'ember';
import config from 'meme-generator/config/environment';

function parametrize(object) {
  var str = "";
  for (var key in object) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + object[key];
  }
  return str;
};

function fetchBlob(uri, callback) {
  var xhr = new XMLHttpRequest();
  
  xhr.open('GET', uri, true);
  xhr.setRequestHeader("X-Mashape-Key", config.mashapeKey);
  xhr.responseType = 'arraybuffer';

  xhr.onload = function(e) {
    if (this.status == 200) {
      var blob = this.response;
      if (callback) {
        callback(blob);
      }
    }
  };

  xhr.send();
};

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = Array.prototype.slice.call(new Uint8Array(buffer));

  bytes.forEach(function(b) {
    binary += String.fromCharCode(b);
  });
    
  return window.btoa(binary);
};


export default Ember.ObjectController.extend({
  memeSrc: "",
  memeType: "Baby Godfather",
  font: "Impact",
  memeTypes: [],
  fonts: [],
  fontSize: 50,
  topText: "Thanks me",
  bottomText: "Later",
  generatingImg: false,

  loadingTypes: Ember.computed.equal('memeTypes.length', 0),
  loadingFonts: Ember.computed.equal('fonts.length', 0),

  generateMeme: function() {
    var base64Flag = 'data:image/jpeg;base64,';
    var url = config.apiHost + "/meme";
    var params = {
      meme: this.get('memeType'),
      font_size: this.get('fontSize'),
      font: this.get('font'),
      top: this.get('topText'),
      bottom: this.get('bottomText')
    };

    url = url + '?' + parametrize(params);
    url = url.replace(/\s/g, '+');

    fetchBlob(url, function(blob) {
      var src = base64Flag + arrayBufferToBase64(blob);

      this.set('generatingImg', false);
      this.set('memeSrc', src);
    }.bind(this));
  },

  generateMemeObserver: function() {
    Ember.run.cancel(this.runCall);

    this.set('generatingImg', true);
    this.runCall = Ember.run.later(this, 'generateMeme', 1000);
  }.observes('memeType', 'font', 'fontSize', 'topText', 'bottomText').on('init')
});