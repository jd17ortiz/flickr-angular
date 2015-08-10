'use strict';
/*jshint esnext: true */
(function () {

  var flickrGallery = function flickrGallery($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
      url: '/',
      views: {
        'header': {
          templateUrl: '../views/header.html'
        },
        'content': {
          templateUrl: '../views/home.html',
          controller: 'flickrGalleryController as flickrGalleryCtrl'
        },
        'footer': {
          templateUrl: '../views/footer.html'
        }
      }
    });
  };

  angular.module('flickrGallery', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', flickrGallery]);
})();
'use strict';

(function () {
  var flickrGalleryController = function flickrGalleryController($scope, flickrGalleryList) {
    var _this = this;

    var self = this;

    flickrGalleryList.getGallery().then(function (gallery) {
      _this.gallery = gallery.data.items;
    }, function (error) {
      console.log(error);
    });
  };

  angular.module('flickrGallery').controller('flickrGalleryController', ['$scope', 'flickrGalleryList', flickrGalleryController]);
})();
'use strict';

(function () {
  var flickrGalleryList = function flickrGalleryList($http) {
    var url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK';

    var gallery = {};

    gallery.getGallery = function () {
      return $http.jsonp(url);
    };

    return gallery;
  };

  angular.module('flickrGallery').factory('flickrGalleryList', ['$http', flickrGalleryList]);
})();