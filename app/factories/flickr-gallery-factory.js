( () => {
  let flickrGalleryList = ($http) => {
    let url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK';

    let gallery = {};

    gallery.getGallery = () => $http.jsonp(url);

    return gallery;

  }

  angular.module('flickrGallery').factory('flickrGalleryList', ['$http', flickrGalleryList]);

})();
