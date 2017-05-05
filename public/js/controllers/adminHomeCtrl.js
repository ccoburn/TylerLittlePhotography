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

  $scope.images = [];

  $scope.getUserNames = function() {
    mediaService.getUserNames().then(function(response) {
      $scope.users = response
    })
  }

  $scope.getUserNames();

  $scope.addUserToAlbum = function(user, album) {
    var userid = $scope.user.id;
    var albumid = $scope.album.id;
    console.log(userid, albumid);
    mediaService.addUserToAlbum(userid, albumid).then(function(response) {
      return response
    })
  }








})
