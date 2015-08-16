'use strict';

/**
 * Karma unit tests.
 */
describe('flickrGalleryModule', function() {
  var $state,view;

  beforeEach(module('flickrGallery'));
  beforeEach(inject(function($injector) {
    $state = $injector.get('$state');
    view = $state.get('home');
  }));

  it('should initialize flickrGallery', function() {
    expect(view).not.toBe(null);
  });
});
