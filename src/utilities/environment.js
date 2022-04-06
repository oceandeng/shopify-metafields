(function (W) {
  var dev = ['127.0.0.1']
  var environment = {
    // dev: 'https://shopify.aiyouyi.cn',
    dev: 'https://metafields-dev.cedate.net/api/',
    release: '/api/'
  }

  var hostname = window.location.hostname
  var apiURL = environment.dev
  var publicSearch = 'hmac=01941f9e5d86f0fc4ea9580f5b239f01a73cea3b6925bd148a2a7e4a34f13db0&locale=en-HK&new_design_language=true&session=bdc973315792c5b0b8b608e61b8386ee8ebb29ae83cd6938162535a6abdae095&shop=ce-test-300.myshopify.com&timestamp=1615170144'

  if (!dev.includes(hostname)) {
    apiURL = environment.release
    publicSearch = window.location.search.substring(1);
  }

  W.appEnvironment = (W.appEnvironment && object.prototype.toString.call(W.appEnvironment) == '[object Object]') ? W.appEnvironment : {}

  W.appEnvironment.apiURL = apiURL
  W.appEnvironment.publicSearch = publicSearch

})(window)