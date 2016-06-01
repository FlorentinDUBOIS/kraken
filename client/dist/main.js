var kraken;

kraken = angular.module('florentindubois.kraken', ['ngAria', 'ngAnimate', 'ngMaterial', 'ngMessages', 'ngRoute', 'ngSanitize', 'pascalprecht.translate']);

kraken.config([
  '$mdThemingProvider', function($mdThemingProvider) {
    return $mdThemingProvider.theme('default').primaryPalette('blue-grey', {
      'default': '800'
    }).accentPalette('pink').warnPalette('red');
  }
]);

kraken.config([
  '$translateProvider', function($translateProvider) {
    var i, language, languages, len;
    languages = ['en'];
    for (i = 0, len = languages.length; i < len; i++) {
      language = languages[i];
      $translateProvider.translations(language, require("json!../languages/" + language + ".lang.json"));
    }
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.preferredLanguage('en');
    return $translateProvider.fallbackLanguage('en');
  }
]);

kraken.controller('kraken.login', ['$scope', function($scope) {}]);

kraken.filter('bytes', [
  function() {
    return function(input, precision) {
      var number, units;
      if (precision == null) {
        precision = 1;
      }
      if (input) {
        units = ['o', 'Ko', 'Mo', 'Go', 'To', 'Po'];
        number = Math.floor(Math.log(input) / Math.log(1024));
        input = ((input / Math.pow(1024, Math.floor(number))).toFixed(precision)) + " " + units[number];
      }
      return input;
    };
  }
]);

kraken.filter('lower', [
  function() {
    return function(input) {
      if (input != null) {
        input = input.toLowerCase();
      }
      return input;
    };
  }
]);

kraken.filter('truncate', [
  function() {
    return function(input, at) {
      if (at == null) {
        at = 40;
      }
      if (input != null) {
        input = (input.substring(0, at - 3)) + "...";
      }
      return input;
    };
  }
]);

kraken.filter('ucfirst', [
  function() {
    return function(input) {
      if (input != null) {
        input = "" + (input.charAt(0).toUpperCase()) + (input.substring(1));
      }
      return input;
    };
  }
]);

kraken.filter('upper', [
  function() {
    return function(input) {
      if (input != null) {
        input = input.toUpperCase();
      }
      return input;
    };
  }
]);

kraken.service('$logger', [
  '$mdToast', function($mdToast) {
    this.info = function(message) {
      return $mdToast.show($mdToast.simple().textContent(message));
    };
    this.warn = function(message) {
      return $mdToast.show($mdToast.simple().textContent(message));
    };
    return this.error = function(message) {
      return $mdToast.show($mdToast.simple().textContent(message));
    };
  }
]);

kraken.service('$request', [
  '$http', '$logger', '$translate', function($http, $logger, $translate) {
    var errorHandler;
    errorHandler = function(res, callback) {
      if (res.status === 403) {
        return $translate('request.notAuthorized').then(function(trad) {
          $logger.error(trad);
          return callback(res);
        });
      }
      if (res.status === 404) {
        return $translate('request.notFound').then(function(trad) {
          $logger.error(trad);
          return callback(res);
        });
      }
      return $translate('request.failure').then(function(trad) {
        $logger.error(trad);
        return callback(res);
      });
    };
    this.get = function(url, callback) {
      return $http.get(url).then(function(res) {
        return callback(null, res.data);
      }, function(res) {
        return errorHandler(res, callback);
      });
    };
    this.post = function(url, data, callback) {
      return $http.post(url, data).then(function(res) {
        return callback(null, res.data);
      }, function(res) {
        return errorHandler(res, callback);
      });
    };
    this.put = function(url, data, callback) {
      return $http.put(url, data).then(function(res) {
        return callback(null, res.data);
      }, function(res) {
        return errorHandler(res, callback);
      });
    };
    this.patch = function(url, data, callback) {
      return $http.patch(url, data).then(function(res) {
        return callback(null, res.data);
      }, function(res) {
        return errorHandler(res, callback);
      });
    };
    return this["delete"] = function(url, callback) {
      return $http["delete"](url).then(function(res) {
        return callback(null, res.data);
      }, function(res) {
        return errorHandler(res, callback);
      });
    };
  }
]);

kraken.service('$user', [
  '$request', function($request) {
    this.get = function(_id, callback) {
      return $request.get("/users/" + _id, callback);
    };
    this.update = function(user, callback) {
      return $request.put("/users/" + user._id, data, callback);
    };
    this["delete"] = function(_id, callback) {
      return $request["delete"]("/users/" + _id, callback);
    };
    this.getAll = function(callback) {
      return $request.get('/users', callback);
    };
    this.login = function(username, password, callback) {
      return $request.post('/log', {
        username: username,
        password: password
      }, callback);
    };
    return this.logout = function(callback) {
      return $request["delete"]('/log', callback);
    };
  }
]);
