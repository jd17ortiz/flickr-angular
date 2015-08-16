( () => {
  let flickrGalleryController = function ($scope, flickrGalleryList) {
      let self = this;


      flickrGalleryList.getGallery().then( (gallery) => {
        this.gallery = (gallery.data.items);
      }, (error) => {
        console.log(error);
      });

      /**
       * @param {Object} picture
       */
      this.toggleFavorite = (picture) => {
        if (sessionStorage[picture.id] !== undefined){
          let pictureObject = JSON.parse(sessionStorage[picture.id]);
          sessionStorage[picture.id] = JSON.stringify({favorite : !pictureObject.favorite});
        }else{
          sessionStorage[picture.id] = JSON.stringify({favorite : true});
        }
      }

      /**
       * @param {Object} picture
       * @return {Boolean}
       */
      this.isFavorite = (picture) => {
        if (sessionStorage[picture.id] !== undefined){
          let pictureObject = JSON.parse(sessionStorage[picture.id]);
          return pictureObject.favorite;
        }
      }

      /**
       * @param {Object} picture
       * @return {String}
       */
      this.getPictureId = (picture) => {
        let time_date_taken = new Date(picture.date_taken);
        let id = time_date_taken.getTime() + '__' + picture.author_id;
        return id;
      }

      /**
       * @param {Object} picture
       */
      this.generateIdPicture = (picture) => {
        picture.id = this.getPictureId(picture);
      }

  }

  angular.module('flickrGallery').controller('flickrGalleryController', ['$scope','flickrGalleryList', flickrGalleryController]);

})()
