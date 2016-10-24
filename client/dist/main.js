(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var kraken;

kraken = angular.module('florentindubois.kraken', ['ngAria', 'ngAnimate', 'ngMaterial', 'ngMessages', 'ngRoute', 'ngSanitize', 'pascalprecht.translate', 'md.data.table']);

kraken.config([
  '$routeProvider', function($routeProvider) {
    var i, route, routes;
    routes = [
      {
        path: '/fs',
        controller: 'fs',
        templateUrl: 'views/fs.jade'
      }, {
        path: '/fs/:signet',
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
    $mdThemingProvider.theme('default').primaryPalette('indigo', {
      'default': '800'
    }).accentPalette('pink').warnPalette('red');
  }
]);

kraken.config([
  '$translateProvider', 'en_US', function($translateProvider, en_US) {
    console.log(en_US);
    $translateProvider.translations('en_US', en_US);
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.preferredLanguage('en_US');
    $translateProvider.fallbackLanguage('en_US');
  }
]);

kraken.controller('kraken.fs', [
  '$scope', '$fs', '$translate', '$logger', '$mdDialog', '$routeParams', '$signets', '$compress', '$mdSidenav', '$window', '$audio', '$video', '$image', function($scope, $fs, $translate, $logger, $mdDialog, $routeParams, $signets, $compress, $mdSidenav, $window, $audio, $video, $image) {
    $scope.selecteds = [];
    $scope.files = [];
    $scope.load = true;
    $scope.path = '/';
    $scope.share = {};
    $scope.realpath = $fs.realpath;
    $scope.list = function(path) {
      $scope.load = true;
      $scope.path = $fs.realpath(path);
      return $fs.list(path, function(error, files) {
        $scope.load = false;
        if (error == null) {
          return $scope.files = files;
        }
      });
    };
    $scope.open = function(name) {
      return $scope.list($scope.path + "/" + name);
    };
    $scope.rename = function(name, $event) {
      return $translate('fs.renameDialog.title').then(function(title) {
        return $translate('fs.renameDialog.text').then(function(text) {
          return $translate('fs.renameDialog.placeholder').then(function(placeholder) {
            return $translate('fs.renameDialog.ok').then(function(ok) {
              return $translate('fs.renameDialog.cancel').then(function(cancel) {
                var prompt;
                prompt = $mdDialog.prompt();
                prompt.title(title).textContent(text).placeholder(placeholder).ariaLabel(placeholder).targetEvent($event).ok(ok).cancel(cancel);
                return $mdDialog.show(prompt).then(function(rename) {
                  $scope.load = true;
                  return $fs.rename($scope.path + "/" + name, $scope.path + "/" + rename, function(error, data) {
                    if (error == null) {
                      if (data.renamed === true) {
                        return $translate('fs.renameDialog.success').then(function(trad) {
                          $scope.list($scope.path);
                          return $logger.info(trad);
                        });
                      }
                    } else {
                      return $scope.list($scope.path);
                    }
                  });
                }, function() {});
              });
            });
          });
        });
      });
    };
    $scope.remove = function(name) {
      return $fs.remove($scope.path + "/" + name, function(error, data) {
        if (error == null) {
          return $translate('fs.remove').then(function(trad) {
            $scope.list($scope.path);
            return $logger.info(trad + " : " + name);
          });
        }
      });
    };
    $scope.removeSelecteds = function() {
      var file, j, len, ref, results;
      ref = $scope.selecteds;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        file = ref[j];
        results.push($scope.remove(file.name));
      }
      return results;
    };
    $scope.listFromSignet = function(_id) {
      $scope.load = true;
      return $signets.getOne(_id, function(error, data) {
        return $scope.list(data.path);
      });
    };
    $scope.compress = function(name) {
      return $compress.zip($scope.path + "/" + name, function(error, data) {
        if (error == null) {
          if (data.compressed === true) {
            return $translate('fs.compress.success').then(function(trad) {
              $logger.info(trad);
              return $scope.list($scope.path);
            });
          }
        }
      });
    };
    $scope.uncompress = function(name) {
      return $compress.unzip($scope.path + "/" + name, function(error, data) {
        if (error == null) {
          if (data.uncompressed === true) {
            return $translate('fs.uncompress.success').then(function(trad) {
              $logger.info(trad);
              return $scope.list($scope.path);
            });
          }
        }
      });
    };
    $scope.bookmark = function(name) {
      return $signets.create($scope.path + "/" + name, function(error, data) {
        if (!error) {
          if (data.created === true) {
            return $translate('fs.bookmark.success').then(function(trad) {
              return $logger.info(trad);
            });
          }
        }
      });
    };
    $scope.isArchive = function(name) {
      return /\.zip$/gi.test(name);
    };
    $scope.isAudioPlayable = function(name) {
      return $audio.isPlayable($fs.realpath($scope.path + "/" + name));
    };
    $scope.isPlayable = function(name) {
      return $audio.isPlayable($fs.realpath($scope.path + "/" + name)) || $video.isPlayable($fs.realpath($scope.path + "/" + name));
    };
    $scope.play = function(name) {
      if ($audio.isPlayable($fs.realpath($scope.path + "/" + name))) {
        return $audio.play($scope.path, name);
      } else if ($video.isPlayable($fs.realpath($scope.path + "/" + name))) {
        return $video.play($scope.path, name);
      }
    };
    $scope.queue = function(name) {
      $audio.queue($scope.path, name);
      return $translate('fs.toolbar.playlist.success').then(function(trad) {
        return $logger.info(trad);
      });
    };
    $scope.queueSelecteds = function() {
      var file, j, len, ref;
      ref = $scope.selecteds;
      for (j = 0, len = ref.length; j < len; j++) {
        file = ref[j];
        if ($audio.isPlayable(file.name)) {
          $audio.queue($scope.path, file.name);
        }
      }
      return $translate('fs.toolbar.playlist.success').then(function(trad) {
        return $logger.info(trad);
      });
    };
    $scope.playQueue = function() {
      return $audio.playQueue();
    };
    $scope.isViewable = function(name) {
      return $image.isViewable(name);
    };
    $scope.view = function(name) {
      return $image.view($scope.path, name);
    };
    if ($routeParams.signet != null) {
      $scope.listFromSignet($routeParams.signet);
    } else {
      $scope.list($scope.path);
    }
  }
]);

kraken.controller('kraken.login', [
  '$scope', '$user', '$logger', '$translate', '$window', '$timeout', function($scope, $user, $logger, $translate, $window, $timeout) {
    $scope.login = {};
    $scope.submit = function() {
      $user.login($scope.login.username, $scope.login.password, function(error, data) {
        if (error == null) {
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
  '$scope', '$user', '$window', '$mdSidenav', '$menu', '$bookmarks', '$translate', '$logger', '$mdDialog', function($scope, $user, $window, $mdSidenav, $menu, $bookmarks, $translate, $logger, $mdDialog) {
    $scope.menu = [];
    $scope.bookmarks = [];
    $scope.shares = [];
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
    $scope.removeBookmark = function(_id) {
      return $bookmarks.remove(_id, function(error, data) {
        if (error == null) {
          if (data.removed) {
            return $translate('navigation.removeBookmark').then(function(trad) {
              $logger.info(trad);
              return $scope.getBookmarks();
            });
          }
        }
      });
    };
    $scope.getBookmarks = function() {
      return $bookmarks.getAll(function(error, bookmarks) {
        if (error == null) {
          return $scope.bookmarks = bookmarks;
        }
      });
    };
    $scope.getBookmarks();
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
      if (input != null) {
        if (input !== 0) {
          units = ['o', 'Ko', 'Mo', 'Go', 'To', 'Po'];
          number = Math.floor(Math.log(input) / Math.log(1024));
          input = ((input / Math.pow(1024, Math.floor(number))).toFixed(precision)) + " " + units[number];
        } else {
          input = '0 o';
        }
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

kraken.filter('time', [
  function() {
    return function(seconds) {
      var hours, minutes, time;
      time = "";
      if (seconds != null) {
        hours = seconds / 3600;
        seconds = seconds % 3600;
        if (0 !== parseInt(hours)) {
          time += (parseInt(hours)) + ":";
        }
        minutes = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60);
        if (minutes < 10 && 0 !== parseInt(hours)) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        time += minutes + ":" + seconds;
      }
      return time;
    };
  }
]);

kraken.filter('truncate', [
  function() {
    return function(input, at) {
      if (at == null) {
        at = 40;
      }
      if ((input != null) && at < input.length) {
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

kraken.constant("en_US", {
  "app": {
    "name": "Kraken"
  },
  "toolbar": {
    "exit": "Exit"
  },
  "navigation": {
    "fs": "File system",
    "manageAccount": "Manage account",
    "menu": "Menu",
    "removeBookmark": "Successfuly removed bookmark",
    "removeShare": "Successfuly removed sharing",
    "bookmark": {
      "singular": "Bookmark",
      "plural": "Bookmarks"
    },
    "share": {
      "singular": "Share",
      "plural": "Shares"
    }
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
    "success": "Successfuly connected",
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
  },
  "fs": {
    "remove": "Successfuly removed",
    "renameDialog": {
      "title": "Rename",
      "text": "Rename a file or folder",
      "placeholder": "New name",
      "ok": "Ok",
      "cancel": "Cancel",
      "success": "Successfuly renamed"
    },
    "table": {
      "name": "Name",
      "size": "Size",
      "mtime": "Last modified"
    },
    "options": {
      "bookmarks": "Bookmarks",
      "open": "Open",
      "share": "Share",
      "rename": "Rename",
      "download": "Download",
      "archive": "Compress",
      "unarchive": "Uncompress",
      "delete": "Delete",
      "play": "Play",
      "queue": "Queue",
      "view": "view"
    },
    "fab": {
      "menu": "Menu",
      "refresh": "Refresh",
      "root": "Go to root",
      "share": "Shared file or folder",
      "queue": "Play songs of queue"
    },
    "toolbar": {
      "filter": "",
      "list": "List",
      "item": {
        "singular": "item selected",
        "plural": "items selecteds"
      },
      "layer": "Parent folder",
      "filterList": "Filter",
      "playlist": {
        "add": "Add to playlist",
        "success": "Added to playlist"
      },
      "delete": "Delete"
    },
    "bookmark": {
      "success": "Successfuly bookmarks"
    },
    "compress": {
      "success": "Successfuly compressed"
    },
    "uncompress": {
      "success": "Successfuly uncompressed"
    }
  },
  "service": {
    "$audio": {
      "error": "This is not a supported audio format",
      "play": "Play",
      "pause": "Pause",
      "stop": "Stop",
      "loop": "Loop",
      "previous": "Previous",
      "next": "Next",
      "mute": "Mute",
      "duration": "Duration",
      "volume": "Volume"
    },
    "$video": {
      "error": "This is not a supported movie format"
    }
  }
});

kraken.run([
  '$rootScope', '$location', '$user', '$translate', '$logger', function($rootScope, $location, $user, $translate, $logger) {
    var paths;
    paths = ['/manage-account'];
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

kraken.service('$audio', [
  '$window', '$mdBottomSheet', '$fs', '$logger', function($window, $mdBottomSheet, $fs, $logger) {
    var audio, extensions, open, queue, queueIndex;
    extensions = ['mp3', 'wav'];
    queue = [];
    queueIndex = 0;
    audio = $window.document.createElement('audio');
    open = false;
    audio.addEventListener('canplay', function() {
      return audio.play();
    });
    audio.addEventListener('ended', (function(_this) {
      return function() {
        if (!audio.loop) {
          if (queueIndex + 1 < queue.length) {
            return _this.next();
          }
        }
      };
    })(this));
    this.isPlayable = function(name) {
      var extension, j, len;
      for (j = 0, len = extensions.length; j < len; j++) {
        extension = extensions[j];
        if ((new RegExp("(\." + extension + ")$")).test(name)) {
          return true;
        }
      }
      return false;
    };
    this.open = (function(_this) {
      return function(path, name) {
        return $mdBottomSheet.show({
          parent: angular.element($window.document.querySelector('body')),
          clickOutsideToClose: false,
          disableBackdrop: true,
          disableParentScroll: false,
          escapeToClose: false,
          templateUrl: 'views/audio.jade',
          controller: [
            '$scope', '$mdBottomSheet', '$interval', function($scope, $mdBottomSheet, $interval) {
              $scope.playing = true;
              audio.addEventListener('loadstart', function() {
                $scope.endTime = audio.duration;
                return $scope.duration = audio.currentTime;
              });
              audio.addEventListener('loadedmetadata', function() {
                return $scope.endTime = audio.seekable.end(0);
              });
              audio.addEventListener('canplay', function() {
                $scope.queueIndex = queueIndex;
                return $scope.queue = queue;
              });
              $scope.next = function() {
                _this.next();
                $scope.queueIndex = queueIndex;
                return $scope.queue = queue;
              };
              $scope.previous = function() {
                _this.previous();
                $scope.queueIndex = queueIndex;
                return $scope.queue = queue;
              };
              $scope.play = function() {
                audio.play();
                return $scope.playing = true;
              };
              $scope.pause = function() {
                audio.pause();
                return $scope.playing = false;
              };
              $scope.mute = function() {
                return audio.volume = $scope.volume = 0;
              };
              $scope.loop = false;
              $scope.setLoop = function(value) {
                return audio.loop = $scope.loop = value;
              };
              $scope.stop = function() {
                $mdBottomSheet.hide();
                $window.document.querySelector('.md-bottom-right, .md-bottom-left').classList.remove('md-over');
                audio.pause();
                open = false;
                $scope.playing = false;
                $scope.queue = queue = [];
                return $scope.queueIndex = queueIndex = 0;
              };
              $scope.volume = audio.volume * 100;
              $scope.changeVolume = function() {
                return audio.volume = $scope.volume / 100;
              };
              $scope.duration = audio.currentTime;
              $scope.changeDuration = function() {
                if (audio.currentTime != null) {
                  return audio.currentTime = $scope.duration;
                }
              };
              $interval(function() {
                if (audio.currentTime != null) {
                  return $scope.duration = audio.currentTime;
                }
              }, 1000);
            }
          ]
        });
      };
    })(this);
    this.play = (function(_this) {
      return function(path, name) {
        $window.document.querySelector('.md-bottom-right, .md-bottom-left').classList.add('md-over');
        if (!open) {
          _this.open(path, name);
          open = true;
        }
        $logger.info(name);
        audio.src = $fs.realpath("mount/" + path + "/" + name);
        return audio.load();
      };
    })(this);
    this.playQueue = (function(_this) {
      return function() {
        if (queue.length) {
          return _this.play(queue[0].path, queue[0].name);
        }
      };
    })(this);
    this.previous = (function(_this) {
      return function() {
        var song;
        if (!(queueIndex - 1 < 0)) {
          song = queue[queueIndex--];
          return _this.play(song.path, song.name);
        }
      };
    })(this);
    this.next = (function(_this) {
      return function() {
        var song;
        if (!(queueIndex + 1 >= queue.length)) {
          song = queue[queueIndex++];
          return _this.play(song.path, song.name);
        }
      };
    })(this);
    this.queue = function(path, name) {
      return queue.push({
        path: path,
        name: name
      });
    };
  }
]);

kraken.service('$bookmarks', [
  '$request', function($request) {
    this.get = function(_id, callback) {
      return $request.get("bookmarks/" + _id, callback);
    };
    this.getAll = function(callback) {
      return $request.get('bookmarks', callback);
    };
    this.create = function(path, callback) {
      return $request.post('bookmarks', {
        path: path
      }, callback);
    };
    this.update = function(_id, path, callback) {
      return $request.put("bookmarks/" + _id, {
        path: path
      }, callback);
    };
    this.remove = function(_id, callback) {
      return $request["delete"]("bookmarks/" + _id, callback);
    };
    this.removeAll = function(callback) {
      return $request["delete"]('bookmarks', callback);
    };
  }
]);

kraken.service('$compress', [
  '$request', '$fs', function($request, $fs) {
    this.zip = function(name, callback) {
      return $request.post($fs.realpath("/compress/" + name), {}, callback);
    };
    this.unzip = function(name, callback) {
      return $request["delete"]($fs.realpath("/compress/" + name), callback);
    };
  }
]);

kraken.service('$fs', [
  '$request', function($request) {
    this.slach = function(path) {
      while (true) {
        if (/\/\//gi.test(path)) {
          path = path.replace(/\/\//gi, '/');
        } else {
          return path;
        }
      }
    };
    this.realpath = (function(_this) {
      return function(path) {
        var dirname, dirnames, fpath, i;
        path = _this.slach(path);
        dirnames = path.split('/');
        fpath = [];
        for (i in dirnames) {
          dirname = dirnames[i];
          if (parseInt(i) + 1 < dirnames.length && dirnames[parseInt(i) + 1] === '..') {
            continue;
          }
          if (dirname === '..') {
            continue;
          }
          fpath.push(dirname);
        }
        if (fpath.length === 0) {
          return '/';
        }
        if (fpath.length === 1) {
          return fpath.join('/').substring(1);
        }
        return fpath.join('/');
      };
    })(this);
    this.list = (function(_this) {
      return function(path, callback) {
        return $request.get(_this.slach("/fs/" + (_this.realpath(path))), callback);
      };
    })(this);
    this.remove = (function(_this) {
      return function(path, callback) {
        return $request["delete"](_this.slach("/fs/" + (_this.realpath(path))), callback);
      };
    })(this);
    this.rename = (function(_this) {
      return function(oldpath, newpath, callback) {
        return $request.patch(_this.slach("/fs/" + (_this.realpath(oldpath))), {
          path: _this.slach(_this.realpath(newpath))
        }, callback);
      };
    })(this);
  }
]);

kraken.service('$image', [
  '$mdDialog', '$window', function($mdDialog, $window) {
    var extensions;
    extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
    this.isViewable = function(name) {
      var extension, j, len;
      for (j = 0, len = extensions.length; j < len; j++) {
        extension = extensions[j];
        if ((new RegExp("(\." + extension + ")$", 'i')).test(name)) {
          return true;
        }
      }
      return false;
    };
    this.view = function(path, name) {
      return $mdDialog.show({
        parent: angular.element($window.document.querySelector('body')),
        clickOutsideToClose: true,
        escapeToClose: true,
        templateUrl: 'views/image.jade',
        controller: [
          '$fs', '$scope', function($fs, $scope) {
            $scope.src = $fs.realpath("mount/" + path + "/" + name);
          }
        ]
      });
    };
  }
]);

kraken.service('$logger', [
  '$mdToast', function($mdToast) {
    this.info = function(message) {
      var toast;
      toast = $mdToast.simple();
      toast.textContent(message).position('bottom right');
      return $mdToast.show(toast);
    };
    this.warn = function(message) {
      var toast;
      toast = $mdToast.simple();
      toast.textContent(message).position('bottom right');
      return $mdToast.show(toast);
    };
    this.error = function(message) {
      var toast;
      toast = $mdToast.simple();
      toast.textContent(message).position('bottom right');
      return $mdToast.show(toast);
    };
  }
]);

kraken.service('$menu', [
  '$request', function($request) {
    this.getItems = function(callback) {
      return $request.get('menu', callback);
    };
  }
]);

kraken.service('$request', [
  '$http', '$logger', '$translate', function($http, $logger, $translate) {
    var errorHandler;
    errorHandler = function(res, callback) {
      if (res.status === 403 || res.status === 401) {
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

kraken.service('$signets', [
  '$request', '$fs', function($request, $fs) {
    this.get = function(callback) {
      return $request.get('/signets', callback);
    };
    this.getOne = function(_id, callback) {
      return $request.get("/signets/" + _id, callback);
    };
    this.create = function(path, callback) {
      return $request.post('/signets', {
        path: $fs.realpath(path)
      }, callback);
    };
    this.update = function(_id, path, callback) {
      return $request.put("/signets/" + _id, {
        path: $fs.realpath(path)
      }, callback);
    };
    this["delete"] = function(_id, callback) {
      return $request["delete"]("/signets/" + _id, callback);
    };
  }
]);

kraken.service('$user', [
  '$request', function($request) {
    this.get = function(_id, callback) {
      return $request.get("users/" + _id, callback);
    };
    this.update = function(user, callback) {
      return $request.put("users/" + user._id, user, callback);
    };
    this.remove = function(_id, callback) {
      return $request["delete"]("users/" + _id, callback);
    };
    this.create = function(user, callback) {
      return $request.post('users', user, callback);
    };
    this.getAll = function(callback) {
      return $request.get('users', callback);
    };
    this.isLog = function(callback) {
      return $request.get('log', callback);
    };
    this.login = function(username, password, callback) {
      return $request.post('log', {
        username: username,
        password: password
      }, callback);
    };
    this.logout = function(callback) {
      return $request["delete"]('log', callback);
    };
    this.isAdministrator = function(callback) {
      return $request.get('administrator', callback);
    };
  }
]);

kraken.service('$video', [
  '$window', '$mdDialog', '$logger', '$translate', function($window, $mdDialog, $logger, $translate) {
    var playables;
    playables = [
      {
        extension: 'mp4',
        mime: 'video/mp4'
      }, {
        extension: 'webm',
        mime: 'video/webm'
      }, {
        extension: 'ogg',
        mime: 'video/ogg'
      }
    ];
    this.isPlayable = function(name) {
      var j, len, playable;
      for (j = 0, len = playables.length; j < len; j++) {
        playable = playables[j];
        if ((new RegExp("(\." + playable.extension + ")$", 'i')).test(name)) {
          return true;
        }
      }
      return false;
    };
    this.mime = function(name) {
      var j, len, playable;
      for (j = 0, len = playables.length; j < len; j++) {
        playable = playables[j];
        if ((new RegExp("(\." + playable.extension + ")$", 'i')).test(name)) {
          return playable.mime;
        }
      }
      return null;
    };
    this.extension = function(name) {
      var j, len, playable;
      for (j = 0, len = playables.length; j < len; j++) {
        playable = playables[j];
        if ((new RegExp("(\." + playable.extension + ")$", 'i')).test(name)) {
          return playable.extension;
        }
      }
      return null;
    };
    this.play = (function(_this) {
      return function(path, name) {
        if (_this.isPlayable(name)) {
          return $mdDialog.show({
            parent: angular.element($window.document.querySelector('body')),
            clickOutsideToClose: true,
            escapeToClose: true,
            templateUrl: 'views/video.jade',
            controller: [
              '$scope', '$mdDialog', '$fs', function($scope, $mdDialog, $fs) {
                $scope.name = $fs.realpath("mount/" + path + "/" + name);
                $scope.mime = _this.mime(name);
                $scope.basename = name;
                $scope.close = function() {
                  return $mdDialog.hide();
                };
              }
            ]
          });
        } else {
          return $translate('service.$video.error').then(function(trad) {
            return $logger.error(trad);
          });
        }
      };
    })(this);
  }
]);

},{}]},{},[1])