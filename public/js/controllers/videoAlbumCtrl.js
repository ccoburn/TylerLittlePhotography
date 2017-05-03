angular.module('app').controller('videoAlbumCtrl', function($scope, mediaService, $stateParams) {


  $scope.test = "videoAlbum"

  $scope.getSampleVideos = function() {
    mediaService.getSampleVideos($stateParams.id).then(function(response) {
      $scope.videos = response;
    })
  }

  $scope.getSampleVideos();

})
