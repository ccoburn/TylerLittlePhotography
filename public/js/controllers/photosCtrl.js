angular.module('app').controller('photosCtrl', function($scope, mediaService, signinService) {


  $scope.test = "photos"

  $scope.getPhotoSampleAlbums = function() {
    mediaService.getPhotoSampleAlbums().then(function(response) {
      $scope.albums = response;
    })
  }

  $scope.getPhotoSampleAlbums();

  function getUser() {
    signinService.getUser().then(function(user) {
      if (user) $scope.user = user.username;
      else   $scope.user = 'NOT LOGGED IN';
    })
  }

  function getUser() {
    signinService.getUser().then(function(user) {
      console.log(user);
      if (user) {
        $scope.user = user.username;
        $scope.userId = user.id;
        console.log($scope.userId);
        $scope.showLogout = true;
        $scope.hideSignin = true;
        if (user.admin === true) {
          $scope.showAdmin = true
        }
        if (user.album) {
          $scope.showYourAlbums = true;
        }

      } else {
      $scope.user = 'NOT LOGGED IN';
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

  $scope.logout = function() {
    signinService.logout();
    $scope.user = 'NOT LOGGED IN';
    $scope.showLogout = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  }



})
