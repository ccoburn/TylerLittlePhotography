angular.module('app').controller('videosCtrl', function($scope, mediaService, $stateParams) {


  $scope.test = "videos"

  $scope.getVideoSampleAlbums = function() {
    mediaService.getVideoSampleAlbums().then(function(response) {
      $scope.albums = response;
    })
  }

  $scope.getVideoSampleAlbums();


})
