'use strict';

/**
 * Karma unit tests.
 */
describe('flickrGalleryCtrl', function() {
  var $httpBackend, $scope, ctrl, $gallery, picture;
  var data = readJSON('mockup/test.json');

  beforeEach(module('flickrGallery'));

  beforeEach(inject(function($injector) {
    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();
    $gallery = $injector.get('flickrGalleryList');

    ctrl = $controller('flickrGalleryController', {
      $scope: $scope,
      gallery : $gallery
    });

    $httpBackend.expectJSONP('http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK&tags=london').respond(200, data);
    $httpBackend.flush();
    picture = data.items[0];
    ctrl.generateIdPicture(data.items[0]);
  }));

  it('should receive five items from factory', function() {
    expect(ctrl.gallery.length).toBe(5);
  });

  it('should create id for picture', function() {
    expect(picture.id).toBeDefined();
  });

  it('should call toggleFavorite method and mark item has favorite', function() {
    ctrl.toggleFavorite(picture);
    var sessionPicture = JSON.parse(sessionStorage[picture.id]);
    expect(sessionPicture.favorite).toBe(true);
  });

  it('should check if the picture is selected as favorite', function() {
    expect(ctrl.isFavorite(picture)).toBe(true);
  });

  it('should remove a favorite already on session storage', function() {
    ctrl.toggleFavorite(picture);
    var sessionPicture = JSON.parse(sessionStorage[picture.id]);
    expect(sessionPicture.favorite).toBe(false);
  });

  it('should check if the picture is not marked as favorite', function() {
    expect(ctrl.isFavorite(picture)).toBe(false);
  });

});
