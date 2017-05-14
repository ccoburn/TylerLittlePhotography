angular.module('app').controller('photoAlbumCtrl', function($scope, mediaService, $stateParams, signinService) {



  // $scope.getMedia = function() {
  //   $scope.photos = [];
  //   mediaService.getMedia().then(function(response) {
  //     $scope.media = response;
  //     for (var i = 0;i<$scope.media.length;i++) {
  //   if ($scope.media[i].samplealbum == $stateParams.id) {
  //     $scope.photos.push($scope.media[i])
  //   }
  // }
  //   })
  // }
  //
  // $scope.getMedia();
  $scope.showParallax = function() {
    console.log($stateParams.id);
    if ($stateParams.id == 1) {
      $scope.wedding = true;
    }
    if ($stateParams.id == 3) {
      $scope.couples = true;
    }
    if ($stateParams.id == 2) {
      $scope.families = true;
    }
    if ($stateParams.id == 4) {
      $scope.newborns = true;
    }
    if ($stateParams.id == 5) {
      $scope.highschool = true;
    }

  }

  $scope.showParallax();

  $scope.getSampleAlbum = function() {
    mediaService.getSampleAlbum($stateParams.id).then(function(response) {
      $scope.photos = response;
    })
  }

  $scope.getSampleAlbum();


  $scope.showing = function() {
    $scope.picture = true;
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
