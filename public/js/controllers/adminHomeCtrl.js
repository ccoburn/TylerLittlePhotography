angular.module('app').controller('adminHomeCtrl', function($scope, mediaService) {

  $scope.getAllSampleAlbums = function() {
    mediaService.getAllSampleAlbums().then(function(response) {
      $scope.sampleAlbums = response;
    })
  }

  $scope.getAllSampleAlbums();

  $scope.getAllClientAlbums = function() {
    mediaService.getAllClientAlbums().then(function(response) {
      $scope.clientAlbums = response;
    })
  }

  $scope.getAllClientAlbums();

  $scope.addAlbum = function(album) {
    mediaService.addAlbum(album).then(function(response) {
      console.log(album);
      return response
    })
  }

})
