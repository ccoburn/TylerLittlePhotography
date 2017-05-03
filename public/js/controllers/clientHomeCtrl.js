angular.module('app').controller('clientHomeCtrl', function($scope, mediaService, $stateParams) {


  $scope.test = "clientHome"

  $scope.getClientAlbums = function() {
    mediaService.getClientAlbums($stateParams.id).then(function(response) {
      $scope.albums = response;
    })
  }

  $scope.getClientAlbums();


})
