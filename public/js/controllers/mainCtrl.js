angular.module('app').controller('mainCtrl', function($scope, mediaService) {


  $scope.getMedia = function() {
    mediaService.getMedia().then(function(response) {
      $scope.media = response;
    })
  }

  $scope.getMedia();



})
