( () => {
  let flickrGalleryController = function ($scope, flickrGalleryList) {
      let self = this;


      flickrGalleryList.getGallery().then( (gallery) => {
        this.gallery = (gallery.data.items);
      }, (error) => {
        console.log(error);
      });
  }

  angular.module('flickrGallery').controller('flickrGalleryController', ['$scope','flickrGalleryList', flickrGalleryController]);

})()
