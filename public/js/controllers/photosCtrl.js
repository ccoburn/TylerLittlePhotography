angular.module('app').controller('photosCtrl', function($scope, mediaService) {


  $scope.test = "photos"

  $scope.getPhotoSampleAlbums = function() {
    mediaService.getPhotoSampleAlbums().then(function(response) {
      $scope.albums = response;
    })
  }

  $scope.getPhotoSampleAlbums();



})
