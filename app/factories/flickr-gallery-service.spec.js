'use strict';

/**
 * Karma unit tests.
 */
describe('flickrGalleryListService', function() {
  var factory

  beforeEach(module('flickrGallery'));
  beforeEach(inject(function($injector) {
    factory = $injector.get('flickrGalleryList');
    spyOn(factory, 'getGallery');

  }));

  it('should call getGallery method from service', function() {
    factory.getGallery();
    expect(factory.getGallery).toHaveBeenCalled();
  });


});
