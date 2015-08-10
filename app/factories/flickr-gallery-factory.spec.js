'use strict';

/**
 * Karma unit tests.
 */
describe('flickrGalleryListFactory', function() {
  var factory

  beforeEach(module('flickrGallery'));
  beforeEach(inject(function($injector) {
    factory = $injector.get('flickrGalleryList');
    spyOn(factory, 'getGallery');

  }));

  it('should call getGallery method from factory', function() {
    factory.getGallery();
    expect(factory.getGallery).toHaveBeenCalled();
  });


});
