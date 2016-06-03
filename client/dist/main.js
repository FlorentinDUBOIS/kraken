/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var kraken;

	kraken = angular.module('florentindubois.kraken', ['ngAria', 'ngAnimate', 'ngMaterial', 'ngMessages', 'ngRoute', 'ngSanitize', 'pascalprecht.translate']);

	kraken.config([
	  '$routeProvider', function($routeProvider) {
	    var i, route, routes;
	    routes = [
	      {
	        path: '/fs',
	        controller: 'fs',
	        templateUrl: 'views/fs.jade'
	      }, {
	        path: '/manage-account',
	        controller: 'manageAccount',
	        templateUrl: 'views/manage-account.jade'
	      }
	    ];
	    for (i in routes) {
	      route = routes[i];
	      $routeProvider.when(route.path, {
	        controller: "kraken." + route.controller,
	        templateUrl: route.templateUrl
	      });
	    }
	    $routeProvider.otherwise('/fs');
	  }
	]);

	kraken.config([
	  '$mdThemingProvider', function($mdThemingProvider) {
	    return $mdThemingProvider.theme('default').primaryPalette('blue', {
	      'default': '900'
	    }).accentPalette('pink').warnPalette('red');
	  }
	]);

	kraken.config([
	  '$translateProvider', function($translateProvider) {
	    var j, language, languages, len;
	    languages = ['en'];
	    for (j = 0, len = languages.length; j < len; j++) {
	      language = languages[j];
	      $translateProvider.translations(language, __webpack_require__(2)("./" + language + ".lang.json"));
	    }
	    $translateProvider.useSanitizeValueStrategy(null);
	    $translateProvider.preferredLanguage('en');
	    return $translateProvider.fallbackLanguage('en');
	  }
	]);

	kraken.controller('kraken.fs', [function() {}]);

	kraken.controller('kraken.login', [
	  '$scope', '$user', '$logger', '$translate', '$window', '$timeout', function($scope, $user, $logger, $translate, $window, $timeout) {
	    $scope.login = {};
	    $scope.submit = function() {
	      $user.login($scope.login.username, $scope.login.password, function(error, data) {
	        if (error != null) {
	          return $logger.error(error.mmessage);
	        }
	        if (data.connected) {
	          return $translate('login.success').then(function(trad) {
	            $logger.info(trad);
	            return $timeout(function() {
	              return $window.location.assign(data.redirect);
	            }, 1000);
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

	kraken.controller('kraken.manageAccount', [
	  '$scope', '$user', '$translate', '$logger', function($scope, $user, $translate, $logger) {
	    $scope.users = [];
	    $scope.user = {};
	    $scope.getUsers = function() {
	      return $user.getAll(function(error, users) {
	        if (error == null) {
	          $scope.users = users;
	          $scope.updateUser.$setPristine();
	          $scope.updateUser.$setUntouched();
	          return $scope.user = {};
	        }
	      });
	    };
	    $scope.select = function($index) {
	      return $scope.user = $scope.users[$index];
	    };
	    $scope.add = function() {
	      $scope.users.push({});
	      return $scope.select($scope.users.length - 1);
	    };
	    $scope.remove = function($index) {
	      return $user.remove($scope.users[$index]._id, function(error, data) {
	        if (error == null) {
	          if (data.removed === true) {
	            return $translate('manageAccount.removed').then(function(trad) {
	              $logger.info(trad);
	              return $scope.getUsers();
	            });
	          }
	        }
	      });
	    };
	    $scope.save = function() {
	      if ($scope.user._id != null) {
	        return $user.update($scope.user, function(error, data) {
	          if (error == null) {
	            if (data.updated === true) {
	              return $translate('manageAccount.updated').then(function(trad) {
	                $logger.info(trad);
	                return $scope.getUsers();
	              });
	            }
	          }
	        });
	      } else {
	        return $user.create($scope.user, function(error, data) {
	          if (error == null) {
	            if (data.created === true) {
	              return $translate('manageAccount.created').then(function(trad) {
	                $logger.info(trad);
	                return $scope.getUsers();
	              });
	            }
	          }
	        });
	      }
	    };
	    $scope.getUsers();
	  }
	]);

	kraken.controller('kraken.navigation', [
	  '$scope', '$user', '$window', '$mdSidenav', '$menu', function($scope, $user, $window, $mdSidenav, $menu) {
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
	    $menu.getItems(function(error, items) {
	      if (error == null) {
	        return $scope.menu = items;
	      }
	    });
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

	kraken.service('$fileSystem', ['$request', function($request) {}]);

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

	kraken.service('$menu', [
	  '$request', function($request) {
	    this.getItems = function(callback) {
	      return $request.get('/menu', callback);
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

	kraken.service('$signets', ['$request', function($request) {}]);

	kraken.service('$user', [
	  '$request', function($request) {
	    this.get = function(_id, callback) {
	      return $request.get("/users/" + _id, callback);
	    };
	    this.update = function(user, callback) {
	      return $request.put("/users/" + user._id, user, callback);
	    };
	    this.remove = function(_id, callback) {
	      return $request["delete"]("/users/" + _id, callback);
	    };
	    this.create = function(user, callback) {
	      return $request.post('/users', user, callback);
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
	    this.isAdministrator = function(callback) {
	      return $request.get('/administrator', callback);
	    };
	  }
	]);

	kraken.run([
	  '$rootScope', '$location', '$user', '$translate', '$logger', function($rootScope, $location, $user, $translate, $logger) {
	    var paths;
	    paths = [];
	    $rootScope.$on('$routeChangeStart', function() {
	      if (-1 === paths.indexOf($location.path())) {
	        return;
	      }
	      return $user.isAdministrator(function(error, data) {
	        if (error == null) {
	          if (!data.administrator) {
	            return $translate('request.notAuthorized').then(function(trad) {
	              $logger.error(trad);
	              return $location.path('/fs');
	            });
	          }
	        }
	      });
	    });
	  }
	]);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./en.lang.json": 3
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
		"app": {
			"name": "Kraken"
		},
		"toolbar": {
			"exit": "Exit"
		},
		"navigation": {
			"fs": "File system",
			"manageAccount": "Manage account"
		},
		"request": {
			"failure": "Request failure",
			"notAuthorized": "Your are not authorized to perform this action",
			"notFound": "Request document is not found"
		},
		"login": {
			"send": "Sign in",
			"username": "Username",
			"password": "Password",
			"success": "Successfully connected",
			"wrong": "Wrong password or username",
			"error": {
				"required": "This field is required"
			}
		},
		"manageAccount": {
			"username": "User name",
			"password": "Password",
			"firstname": "First name",
			"lastname": "Last name",
			"email": "Mail",
			"administrator": "His an administrator ?",
			"submit": "Save",
			"remove": "Remove",
			"userInformation": "User information",
			"userInformationComplete": "Complete information about user",
			"selectUser": "Select user to modify",
			"addAdministrator": "Create a new user",
			"removed": "Successfuly removed an user",
			"updated": "Successfuly updated an user",
			"created": "Successfuly created an user",
			"error": {
				"required": "This is required.",
				"email": "This is not a correct email."
			}
		}
	};

/***/ }
/******/ ]);