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

kraken.controller('kraken.login', [
  '$scope', '$user', '$logger', '$translate', '$window', function($scope, $user, $logger, $translate, $window) {
    $scope.login = {};
    $scope.submit = function() {
      $user.login($scope.login.username, $scope.login.password, function(error, data) {
        if (error != null) {
          return $logger.error(error.mmessage);
        }
        if (data.connected) {
          return $translate('login.success').then(function(trad) {
            $logger.info(trad);
            return $window.location.assign(data.redirect);
          });
        } else {
          return $translate('login.wrong').then(function(trad) {
            return $logger.error(trad);
          });
        }
      });
      return false;
    };
  }
]);

kraken.controller('kraken.navigation', [
  '$scope', '$user', '$window', '$sidenav', '$mdSidenav', function($scope, $user, $window, $sidenav, $mdSidenav) {
    $scope.menu = [];
    $scope.signets = [];
    $scope.openSidenav = function() {
      return $mdSidenav('left').toggle();
    };
    $scope.exit = function() {
      return $user.logout(function(error, data) {
        if (error == null) {
          if (data.redirect != null) {
            return $window.location.assign(data.redirect);
          }
        }
      });
    };
  }
]);

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
    this.error = function(message) {
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
          return callback(new Error(trad));
        });
      }
      if (res.status === 404) {
        return $translate('request.notFound').then(function(trad) {
          $logger.error(trad);
          return callback(new Error(trad));
        });
      }
      return $translate('request.failure').then(function(trad) {
        $logger.error(trad);
        return callback(new Error(trad));
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
    this["delete"] = function(url, callback) {
      return $http["delete"](url).then(function(res) {
        return callback(null, res.data);
      }, function(res) {
        return errorHandler(res, callback);
      });
    };
  }
]);

kraken.service('$sidenav', ['$request', function($request) {}]);

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
    this.isLog = function(callback) {
      return $request.get('/log', callback);
    };
    this.login = function(username, password, callback) {
      return $request.post('/log', {
        username: username,
        password: password
      }, callback);
    };
    this.logout = function(callback) {
      return $request["delete"]('/log', callback);
    };
  }
]);
