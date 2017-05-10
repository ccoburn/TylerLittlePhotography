angular.module('app').controller('adminHomeCtrl', function($scope, mediaService, signinService) {

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

  $scope.addAlbum = function(newalbum) {
    console.log(newalbum);
    mediaService.addAlbum(newalbum).then(function(response) {
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


  function getUser() {
    signinService.getUser().then(function(user) {
      if (user) $scope.user = user.username;
      else   $scope.user = 'NOT LOGGED IN';
    })
  }

  getUser();

  $scope.loginLocal = function(username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    })
    .then(function(res) {
      getUser();
    })
  }

  $scope.logout = signinService.logout;





})
