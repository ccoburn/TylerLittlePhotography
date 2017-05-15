angular.module('app').controller('adminHomeCtrl', function($scope, mediaService, signinService, $location) {

$scope.redirect = function() {
    $location.path('home').then($scope.alert());
}

$scope.alert = function() {
  setTimeout(function(){ alert("Not Authorized"); }, 500);
}

  function getUser() {
    signinService.getUser().then(function(user) {
      if (!user.admin) {
        $scope.redirect();
      }
      if (user) {
        $scope.user = user.username;
        $scope.userId = user.id;
        console.log($scope.userId);
        $scope.showLogout = true;
        $scope.hideSignin = true;
        $scope.username = true;
        if (user.admin === true) {
          $scope.showAdmin = true
        }
        if (user.album) {
          $scope.showYourAlbums = true;
        }

      } else {
      $scope.redirect();
      $scope.user = '';
      $scope.username = false;
      $scope.showLogout = false;
      $scope.hideSignin = false;
      $scope.showAdmin = false;
      $scope.showYourAlbums = false;
      }
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
      $scope.clientNames = response
    })
  }

  $scope.getUserNames();

  $scope.addAlbumToUser = function(user, album) {
    var userid = $scope.clientName.id;
    var albumid = $scope.album.id;
    console.log(user, album);
    mediaService.addAlbumToUser(userid, albumid).then(function(response) {
      return response
    })
  }

  $scope.getAllPhotos = function(){
    mediaService.getMedia().then(function(response) {
      $scope.photos = response;
    })
  }

$scope.getAllPhotos();



  $scope.logout = function() {
    signinService.logout();
    $scope.user = '';
    $scope.showLogout = false;
    $scope.username = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  }





})
