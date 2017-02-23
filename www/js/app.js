// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.factory','starter.controllers','ionic.cloud','ui.bootstrap','highcharts-ng','ngTable','ngCordova'])

.run(function($ionicPlatform,$rootScope, $location,$ionicLoading,$ionicDeploy) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $ionicDeploy.channel = 'dev';
    $ionicDeploy.check().then(function(snapshotAvailable) {
    if (snapshotAvailable) {
      // When snapshotAvailable is true, you can apply the snapshot
    $ionicDeploy.download().then(function() { return $ionicDeploy.extract(); }).then(function() { $ionicDeploy.load(); }).catch(function(error) { console.log(error);});
    }
    });

    var history = [];

    $rootScope.$on('$routeChangeSuccess', function() {
        history.push($location.$$path);
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $ionicLoading.show({
                template: '<ion-spinner class="spinner-energized"></ion-spinner>',
                duration: 30000
            });
        });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $ionicLoading.hide();
        });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            $ionicLoading.hide();
            console.error("Error loading the page: %o", error);
        });

    $rootScope.back = function () {
        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
        $location.path(prevUrl);
    };

  });
})
.filter('filterText', function () {
    return function (text) {
        if (text.charAt(text.length - 1) == ">") {
            var str = text.substring(1, text.length-1);
            str = "-"+str;
            return str;
        }
        return text;
    };
})
/*
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}])
*/
/*
.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
})
*/
/*
.config(function($cordovaInAppBrowserProvider,$ionicPlatform) {

  var defaultOptions = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'no'
  };

  $ionicPlatform.ready(function() {

    $cordovaInAppBrowserProvider.setDefaultOptions(options)

  }, false);
})
*/
.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "c6834626"
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
.state('Home', {
            url: '/Home',
            views: {
                'menuContent': {
                    templateUrl: '../OA.jsp?OAFunc=OAHOMEPAGE',
                    controller: function($scope){}
                },
            }
        })
.state('Login', {
            url: '/Login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
       })
.state('Logout', {
            url: '/Logout',
            views: {
                'menuContent': {
                    templateUrl: '../OALogout.jsp',
                    controller: function($scope){}
                },
            }
        })
.state('app.Dashboard', {
            url: "/Dashboard",
            views: {
               'menuContent': {
                    templateUrl: 'templates/Dashboard.html',
                    controller: 'DashboardController'
                },
            }
        })

.state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
.state('app.Rollcall', {
      url: '/Rollcall',
      params : {unqId : null},
      views: {
        'menuContent': {
          templateUrl: 'templates/Rollcall.html',
          controller: 'RollcallCtrl'
        }
      }
    })

.state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/Rollcall');
  $urlRouterProvider.otherwise('/app/Dashboard');
  //$urlRouterProvider.otherwise('Login');
});
