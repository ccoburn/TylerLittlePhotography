angular.module('app').controller('videosCtrl', function($scope, mediaService, $stateParams, $sce, signinService) {


  $scope.getSampleVideos = function() {
    mediaService.getSampleVideos().then(function(response) {
      $scope.videos = response;
    })
  }

  $scope.getSampleVideos();

  $scope.getMainVideo = function() {
    mediaService.getVideoById($stateParams.id).then(function(response) {
      $scope.mainVideo = response;
      console.log($scope.mainVideo);
      if ($scope.mainVideo[0].video_src === 'youtube') {
        $scope.youtube = true;
        $scope.vimeo = false;
      }
      if ($scope.mainVideo[0].video_src === 'vimeo') {
        $scope.youtube = false;
        $scope.vimeo = true;
      }
    })
  }

  $scope.getMainVideo();

  $scope.getYoutube = function() {
    mediaService.getYoutube().then(function(response) {
      $scope.ytvideos = response;
    })
  }

  $scope.getYoutube();

  $scope.getVimeo = function() {
    mediaService.getVimeo().then(function(response) {
      $scope.vimvideos = response;
    })
  }

  $scope.getVimeo();


  function getUser() {
    signinService.getUser().then(function(user) {
      console.log(user);
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
