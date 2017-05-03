angular.module('app').controller('clientAlbumCtrl', function($scope, mediaService, $stateParams) {


  $scope.test = "clientAlbum"

  $scope.getClientAlbum = function() {
    mediaService.getClientAlbum($stateParams.id).then(function(response) {
      $scope.photos = response;
    })
  }

  $scope.getClientAlbum();



})
