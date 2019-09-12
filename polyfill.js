(function(global) {
  var ua = global.navigator.userAgent.toLowerCase();
  var getAndroidVersion = function(ua) {
    var match = ua.match(/android\s([0-9]+\.[0-9]+)/);
    return match ? match[1] : null;
  }
  var getiOSVersion = function(ua) {
    var REGEX = /os (\d\d?_\d(_\d)?)/;
    var matches = REGEX.exec(ua);
    if (!matches) return null
    var match = matches[1].split('_').map(parseInt);
    return match ? match[0] : null;
  }
  var loadJS = function(url) {
    var js = document.createElement('script');
    js.src = url;
    js.async = false;
    js.onerror = function() {
      window.polyfillLoaded = 1;
      console.log(new Error('Failed to load script ' + src));
    };
    js.onload = function() {
      window.polyfillLoaded = 1;
      console.log('polyfill loaded');
    }
    document.body.insertBefore(js, document.querySelector('body > script').nextSibling);
  }
  var version = null,
    url = null, 
    kdprefix = '',
    polyfillio = 'https://cdn.polyfill.io/v3/polyfill.min.js';
  if (/iphone/i.test(ua) || /ipad/i.test(ua)) {
    version = getiOSVersion(ua);
    version === 8 && (url = kdprefix + 'ios8.js');
    version === 9 && (url = kdprefix + 'ios9.js');
    (version === 10 || version === 11) && (url = kdprefix + 'ios10.js');
  } else if (/android/i.test(ua)) {
    version = parseFloat(getAndroidVersion(ua));
    if (version !== null) {
      version <= 4.3 && (url = kdprefix + 'android41.js');
      version >= 4.4 && version < 5 && (url = kdprefix + 'android44.js');
      version >= 5 && version < 6 && (url = kdprefix + 'android50.js');
      version >= 6 && version < 7 && (url = kdprefix + 'android60.js');
      version >= 7 && version < 7.1 && (url = kdprefix + 'android70.js');
      version >= 7.1 && version < 8 && (url = kdprefix + 'android71.js');
    }
  }
  if(!!url) loadJS(url);
  else window.polyfillLoaded = 1;
}(window));