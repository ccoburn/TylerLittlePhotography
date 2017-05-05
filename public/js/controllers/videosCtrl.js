angular.module('app').controller('videosCtrl', function($scope, mediaService, $stateParams) {


  $scope.test = "videos"

  $scope.getSampleVideos = function() {
    mediaService.getSampleVideos().then(function(response) {
      $scope.videos = response;
    })
  }

  $scope.getSampleVideos();


})
