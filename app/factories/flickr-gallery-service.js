( () => {
  let flickrGalleryList = ($http, $q) => {
    let url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK&tags=london';

    let getGallery = () => {
      let defered = $q.defer();
      let promise = defered.promise;
      $http.jsonp(url)
           .success(function(data) {
             defered.resolve(data);
           })
           .error(function(err) {
             defered.reject(err)
           });

      return promise;
    }

    return {
        getGallery: getGallery
    }

  }

  angular.module('flickrGallery').service('flickrGalleryList', ['$http', '$q', flickrGalleryList]);

})();
