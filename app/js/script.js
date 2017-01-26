var bookmarkApp = angular.module('bookmarkApp', ['ngRoute', 'ngSanitize']);

bookmarkApp.controller("bookmarkController", function ($http, $scope, $location, $interval, $filter) {
  "use strict";
  $http.get("bookmark.json").then(function (data) {
    $scope.bookmarks = data.data.bookmark;
    $scope.all = [];
    var i, j;
    for (i = 0; i < $scope.bookmarks.length; i++) {
      for (j = 0; j < $scope.bookmarks[i].entry.length; j++) {
        var obj = {"name": $scope.bookmarks[i].entry[j].name, "url": $scope.bookmarks[i].entry[j].url};
        $scope.all.push(obj);
      }
    }
  });

  $scope.startSearch = function () {
    if ($scope.search !== ""){
      if ($location.path() === '/all') {
        $location.path('/search');
      }
    } else {
      $location.path('/all');
    }
  };
  
  $scope.goSearch = function () {
    console.log($scope.search);
    if ($scope.search !== undefined) {
      window.location.assign('https://www.google.com/search?q=' + $scope.search);
    }
  };
  
  $scope.pageClass = function (path) {
    return (path === $location.path()) ? 'active' : '';
  };
  
  var tick = function () {
    $scope.now = Date.now();
    var s = $filter('date')($scope.now, 's');
    $scope.blink = function () {
      return (s % 2) ? 'sep blink' : 'sep';
    };
  };
  
  tick();
  $interval(tick, 1000);
});

bookmarkApp.config(function ($routeProvider) {
  "use strict";
  $routeProvider
    .when('/all', {
      controller: 'bookmarkController',
      templateUrl: 'parts/all.html'
    })
    .when('/news', {
      controller: 'bookmarkController',
      templateUrl: 'parts/news.html'
    })
    .when('/social', {
      controller: 'bookmarkController',
      templateUrl: 'parts/social.html'
    })
    .when('/reddit', {
      controller: 'bookmarkController',
      templateUrl: 'parts/reddit.html'
    })
    .when('/misc', {
      controller: 'bookmarkController',
      templateUrl: 'parts/misc.html'
    })
    .when('/project', {
      controller: 'bookmarkController',
      templateUrl: 'parts/project.html'
    })
    .when('/search', {
      controller: 'bookmarkController',
      templateUrl: 'parts/search.html'
    })
    .when('/mail', {
      controller: 'bookmarkController',
      templateUrl: 'parts/mail.html'
    })
    .otherwise({
      redirectTo: '/all'
    });
});
