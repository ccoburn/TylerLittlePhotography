angular.module('app').controller('videosCtrl', function($scope, mediaService, $stateParams, $sce, signinService) {


  $scope.test = "videos"

  $scope.getSampleVideos = function() {
    mediaService.getSampleVideos().then(function(response) {
      $scope.videos = response;
    })
  }

  $scope.getSampleVideos();


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
