'use strict';
/*jshint esnext: true */
(() => {

  let flickrGallery = ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
      url : '/',
      views : {
        'header' : {
          templateUrl : '../views/header.html'
        },
        'content' : {
          templateUrl : '../views/home.html',
          controller  : 'flickrGalleryController as flickrGalleryCtrl'
        },
        'footer' : {
          templateUrl : '../views/footer.html'
        }
      }
    });
  }

  angular.module('flickrGallery', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', flickrGallery]);

})();
