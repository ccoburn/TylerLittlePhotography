'use strict';

angular.module('app').directive('couples', function () {

  return {
    restrict: 'E',
    templateUrl: './views/couplesPara.html'
  };
});
'use strict';

angular.module('app').directive('families', function () {

  return {
    restrict: 'E',
    templateUrl: './views/familiesPara.html'
  };
});
'use strict';

angular.module('app').directive('highschool', function () {

  return {
    restrict: 'E',
    templateUrl: './views/highschoolPara.html'
  };
});
'use strict';

angular.module('app').directive('newborns', function () {

  return {
    restrict: 'E',
    templateUrl: './views/newbornsPara.html'
  };
});
'use strict';

angular.module('app').directive('fileread', function (mediaService) {
  return {
    restrict: 'A',
    link: function link(scope, elem, attrs) {
      elem.bind("change", function (changeEvent) {
        var reader = new FileReader();

        reader.onloadend = function (loadEvent) {
          debugger;
          var fileread = loadEvent.target.result;
          // console.warn(fileread);


          var tempArray = elem[0].value.split('\\');

          var fileName = tempArray[tempArray.length - 1];
          var type = scope.type;
          var clientId = null;
          var sampleId = null;
          if (scope.client) {
            clientId = scope.client.id;
          }
          if (scope.sample) {
            sampleId = scope.sample.id;
          }

          console.log(type, clientId, sampleId);

          mediaService.storeImage(fileread, fileName, type, clientId, sampleId).then(function (result) {
            scope.images.unshift(result.data);
          }).catch(function (err) {
            console.error(err);
          });
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  };
});
'use strict';

angular.module('app').directive('wedding', function () {

  return {
    restrict: 'E',
    templateUrl: './views/weddingPara.html'
  };
});
'use strict';

angular.module('app').controller('aboutCtrl', function ($scope, signinService) {

  $scope.test = "about";

  function getUser() {
    signinService.getUser().then(function (user) {
      console.log(user);
      if (user) {
        $scope.user = user.username;
        $scope.userId = user.id;
        console.log($scope.userId);
        $scope.showLogout = true;
        $scope.hideSignin = true;
        $scope.username = true;
        if (user.admin === true) {
          $scope.showAdmin = true;
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
    });
  }

  getUser();

  $scope.loginLocal = function (username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    }).then(function (res) {
      getUser();
    });
  };

  $scope.logout = function () {
    signinService.logout();
    $scope.user = '';
    $scope.showLogout = false;
    $scope.username = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  };
});
'use strict';

angular.module('app').controller('adminHomeCtrl', function ($scope, mediaService, signinService, $location) {

  $scope.redirect = function () {
    $location.path('home').then($scope.alert());
  };

  $scope.alert = function () {
    setTimeout(function () {
      alert("Not Authorized");
    }, 500);
  };

  function getUser() {
    signinService.getUser().then(function (user) {
      if (user) {
        if (!user.admin) {
          $scope.redirect();
        }
        $scope.user = user.username;
        $scope.userId = user.id;
        console.log($scope.userId);
        $scope.showLogout = true;
        $scope.hideSignin = true;
        $scope.username = true;
        if (user.admin === true) {
          $scope.showAdmin = true;
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
    });
  }

  getUser();

  $scope.loginLocal = function (username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    }).then(function (res) {
      getUser();
    });
  };

  $scope.getAllSampleAlbums = function () {
    mediaService.getAllSampleAlbums().then(function (response) {
      $scope.sampleAlbums = response;
    });
  };

  $scope.getAllSampleAlbums();

  $scope.getAllClientAlbums = function () {
    mediaService.getAllClientAlbums().then(function (response) {
      $scope.clientAlbums = response;
    });
  };

  $scope.getAllClientAlbums();

  $scope.addAlbum = function (newalbum) {
    console.log(newalbum);
    mediaService.addAlbum(newalbum).then(function (response) {
      return response;
    });
  };

  $scope.images = [];

  $scope.getUserNames = function () {
    mediaService.getUserNames().then(function (response) {
      $scope.clientNames = response;
    });
  };

  $scope.getUserNames();

  $scope.addAlbumToUser = function (user, album) {
    var userid = $scope.clientName.id;
    var albumid = $scope.album.id;
    console.log(user, album);
    mediaService.addAlbumToUser(userid, albumid).then(function (response) {
      return response;
    });
  };

  $scope.getAllPhotos = function () {
    mediaService.getMedia().then(function (response) {
      $scope.photos = response;
    });
  };

  $scope.getAllPhotos();

  $scope.logout = function () {
    signinService.logout();
    $scope.user = '';
    $scope.showLogout = false;
    $scope.username = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  };
});
'use strict';

angular.module('app').controller('clientAlbumCtrl', function ($scope, mediaService, $stateParams, signinService, $location) {

  $scope.redirect = function () {
    $location.path('home').then($scope.alert());
  };

  $scope.alert = function () {
    setTimeout(function () {
      alert("Not Authorized");
    }, 500);
  };

  function getUser() {
    signinService.getUser().then(function (user) {
      console.log(user);
      if (user) {
        $scope.user = user.username;
        $scope.userId = user.id;
        console.log($scope.userId);
        $scope.showLogout = true;
        $scope.hideSignin = true;
        if (parseInt(user.album) !== parseInt($stateParams.id) && user.admin !== true) {
          $scope.redirect();
        }
        $scope.username = true;
        if (user.admin === true) {
          $scope.showAdmin = true;
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
    });
  }

  getUser();

  $scope.loginLocal = function (username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    }).then(function (res) {
      getUser();
    });
  };
  $scope.getClientAlbum = function () {
    mediaService.getClientAlbum($stateParams.id).then(function (response) {
      $scope.photos = response;
    });
  };

  $scope.getClientAlbum();

  $scope.logout = function () {
    signinService.logout();
    $scope.user = '';
    $scope.showLogout = false;
    $scope.username = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  };
});
"use strict";
'use strict';

angular.module('app').controller('clientHomeCtrl', function ($scope, mediaService, $stateParams, signinService, $location) {

  $scope.redirect = function () {
    $location.path('home').then($scope.alert());
  };

  $scope.alert = function () {
    setTimeout(function () {
      alert("Not Authorized");
    }, 500);
  };

  function getUser() {
    signinService.getUser().then(function (user) {
      console.log(user);
      if (user) {
        $scope.user = user.username;
        $scope.userId = user.id;
        console.log($scope.userId);
        $scope.showLogout = true;
        $scope.hideSignin = true;
        if (parseInt(user.id) !== parseInt($stateParams.id) && user.admin !== true) {
          $scope.redirect();
        }
        $scope.username = true;
        if (user.admin === true) {
          $scope.showAdmin = true;
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
    });
  }

  getUser();

  $scope.loginLocal = function (username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    }).then(function (res) {
      getUser();
    });
  };

  $scope.logout = function () {
    signinService.logout();
    $scope.user = '';
    $scope.showLogout = false;
    $scope.username = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  };

  $scope.getClientAlbums = function () {
    mediaService.getClientAlbums($stateParams.id).then(function (response) {
      $scope.albums = response;
      console.log($scope.albums);
    });
  };

  $scope.getClientAlbums();
});
'use strict';

angular.module('app').controller('contactCtrl', function ($scope) {

  $scope.test = "contact";
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, mediaService, signinService) {

  // $scope.getMedia = function() {
  //   mediaService.getMedia().then(function(response) {
  //     $scope.media = response;
  //   })
  // }
  //
  // $scope.getMedia();

  function getUser() {
    signinService.getUser().then(function (user) {
      console.log(user);
      if (user) {
        $scope.user = user.username;
        $scope.userId = user.id;
        console.log($scope.userId);
        $scope.showLogout = true;
        $scope.hideSignin = true;
        $scope.username = true;
        if (user.admin === true) {
          $scope.showAdmin = true;
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
    });
  }

  getUser();

  $scope.loginLocal = function (username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    }).then(function (res) {
      getUser();
    });
  };

  $scope.logout = function () {
    signinService.logout();
    $scope.user = '';
    $scope.showLogout = false;
    $scope.username = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  };
});
'use strict';

angular.module('app').controller('photoAlbumCtrl', function ($scope, mediaService, $stateParams, signinService) {

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
  $scope.showParallax = function () {
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
  };

  $scope.showParallax();

  $scope.getSampleAlbum = function () {
    mediaService.getSampleAlbum($stateParams.id).then(function (response) {
      $scope.photos = response;
    });
  };

  $scope.getSampleAlbum();

  $scope.showing = function () {
    $scope.picture = true;
  };

  function getUser() {
    signinService.getUser().then(function (user) {
      console.log(user);
      if (user) {
        $scope.user = user.username;
        $scope.userId = user.id;
        console.log($scope.userId);
        $scope.showLogout = true;
        $scope.hideSignin = true;
        $scope.username = true;
        if (user.admin === true) {
          $scope.showAdmin = true;
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
    });
  }

  getUser();

  $scope.loginLocal = function (username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    }).then(function (res) {
      getUser();
    });
  };

  $scope.logout = function () {
    signinService.logout();
    $scope.user = '';
    $scope.showLogout = false;
    $scope.username = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  };
});
'use strict';

angular.module('app').controller('photosCtrl', function ($scope, mediaService, signinService) {

  $scope.test = "photos";

  $scope.getPhotoSampleAlbums = function () {
    mediaService.getPhotoSampleAlbums().then(function (response) {
      $scope.albums = response;
    });
  };

  $scope.getPhotoSampleAlbums();

  function getUser() {
    signinService.getUser().then(function (user) {
      console.log(user);
      if (user) {
        $scope.user = user.username;
        $scope.userId = user.id;
        console.log($scope.userId);
        $scope.showLogout = true;
        $scope.hideSignin = true;
        $scope.username = true;
        if (user.admin === true) {
          $scope.showAdmin = true;
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
    });
  }

  getUser();

  $scope.loginLocal = function (username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    }).then(function (res) {
      getUser();
    });
  };

  $scope.logout = function () {
    signinService.logout();
    $scope.user = '';
    $scope.showLogout = false;
    $scope.username = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  };
});
"use strict";
'use strict';

angular.module('app').controller('signinCtrl', function ($scope, signinService, $state) {

  function getUser() {
    signinService.getUser().then(function (user) {
      if (user) $scope.user = user.username;else $scope.user = 'NOT LOGGED IN';
    });
  }

  getUser();

  $scope.loginLocal = function (username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    }).then(function (res) {
      getUser();
    });
  };

  $scope.logout = signinService.logout;
});
"use strict";
'use strict';

angular.module('app').controller('videoAlbumCtrl', function ($scope, mediaService, $stateParams, signinService) {

  $scope.test = "videoAlbum";

  $scope.getSampleVideos = function () {
    mediaService.getSampleVideos($stateParams.id).then(function (response) {
      $scope.videos = response;
    });
  };

  $scope.getSampleVideos();

  function getUser() {
    signinService.getUser().then(function (user) {
      if (user) $scope.user = user.username;else $scope.user = 'NOT LOGGED IN';
    });
  }

  getUser();

  $scope.loginLocal = function (username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    }).then(function (res) {
      getUser();
    });
  };

  $scope.logout = signinService.logout;
});
'use strict';

angular.module('app').controller('videosCtrl', function ($scope, mediaService, $stateParams, $sce, signinService) {

  $scope.getSampleVideos = function () {
    mediaService.getSampleVideos().then(function (response) {
      $scope.videos = response;
    });
  };

  $scope.getSampleVideos();

  $scope.getMainVideo = function () {
    mediaService.getVideoById($stateParams.id).then(function (response) {
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
    });
  };

  $scope.getMainVideo();

  $scope.getYoutube = function () {
    mediaService.getYoutube().then(function (response) {
      $scope.ytvideos = response;
    });
  };

  $scope.getYoutube();

  $scope.getVimeo = function () {
    mediaService.getVimeo().then(function (response) {
      $scope.vimvideos = response;
    });
  };

  $scope.getVimeo();

  function getUser() {
    signinService.getUser().then(function (user) {
      console.log(user);
      if (user) {
        $scope.user = user.username;
        $scope.userId = user.id;
        console.log($scope.userId);
        $scope.showLogout = true;
        $scope.hideSignin = true;
        $scope.username = true;
        if (user.admin === true) {
          $scope.showAdmin = true;
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
    });
  }

  getUser();

  $scope.loginLocal = function (username, password) {
    console.log('Logging in with', username, password);
    signinService.loginLocal({
      username: username,
      password: password
    }).then(function (res) {
      getUser();
    });
  };

  $scope.logout = function () {
    signinService.logout();
    $scope.user = '';
    $scope.showLogout = false;
    $scope.username = false;
    $scope.hideSignin = false;
    $scope.showAdmin = false;
    $scope.showYourAlbums = false;
  };
});
"use strict";
'use strict';

angular.module('app').service('mediaService', function ($http) {

  this.getMedia = function () {
    return $http.get('/api/allMedia').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getPhotoSampleAlbums = function () {
    return $http.get('/api/SamplePhotos').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getSampleAlbum = function (id) {
    return $http.get('/api/SamplePhotoAlbum/' + id).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getClientAlbums = function (id) {
    return $http.get('/api/ClientAlbums/' + id).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getClientAlbum = function (id) {
    return $http.get('/api/ClientAlbum/' + id).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getVideoSampleAlbums = function () {
    return $http.get('/api/SampleVideos').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getSampleVideos = function () {
    return $http.get('/api/Videos').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getVideoById = function (id) {
    return $http.get('/api/Video/' + id).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getYoutube = function () {
    return $http.get('/api/VideosYoutube').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getVimeo = function () {
    return $http.get('/api/VideosVimeo').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getAllSampleAlbums = function () {
    return $http.get('/api/SampleAlbums').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getAllClientAlbums = function () {
    return $http.get('/api/AllClientAlbums').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.addAlbum = function (album) {
    return $http.post('/api/AddAlbum', { name: album.name, date: album.date }).then(function (response) {
      console.log(album);
      return response;
    });
  };

  this.storeImage = function (imageData, fileName, type, clientId, sampleId) {
    var imageExtension = imageData.split(';')[0].split('/');
    imageExtension = imageExtension[imageExtension.length - 1];

    var newImage = {
      imageName: fileName,
      imageBody: imageData,
      imageExtension: imageExtension,
      type: type,
      clientId: clientId,
      sampleId: sampleId
    };

    return $http.post('/api/uploadImage', newImage);
  };

  this.getUserNames = function () {
    return $http.get('/api/UserNames').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.addAlbumToUser = function (userid, albumid) {
    return $http.post('/api/addAlbumToUser', { userid: userid, albumid: albumid });
  };
});
'use strict';

angular.module('app').service('signinService', function ($http) {
  this.loginLocal = function (credentials) {
    return $http({
      method: "POST",
      url: '/auth/local',
      data: credentials
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log('ERROR LOGGING IN!', err);
    });
  };

  this.getUser = function () {
    return $http({
      method: 'GET',
      url: '/auth/me'
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.logout = function () {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };
});
//# sourceMappingURL=bundle.js.map
