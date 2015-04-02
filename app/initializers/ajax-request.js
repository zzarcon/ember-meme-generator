import config from 'meme-generator/config/environment';

/**
 * Injects request headers for each AJAX call
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
export function initialize(container, application) {
  var headers = {
    "X-Mashape-Key": config.mashapeKey
  };

  $.ajaxSetup({
    beforeSend: function(xhr) {
      for (var header in headers) {
        if (headers.hasOwnProperty(header)) {
          xhr.setRequestHeader(header, headers[header]);
        }
      }
    }
  });
}

export default {
  name: 'ajax-request',
  initialize: initialize
};