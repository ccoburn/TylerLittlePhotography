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

angular.module('app').controller('aboutCtrl', function ($scope) {

  $scope.test = "about";
});
'use strict';

angular.module('app').controller('adminHomeCtrl', function ($scope, mediaService) {

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

  $scope.addAlbum = function (album) {
    mediaService.addAlbum(album).then(function (response) {
      console.log(album);
      return response;
    });
  };

  $scope.images = [];

  $scope.getUserNames = function () {
    mediaService.getUserNames().then(function (response) {
      $scope.users = response;
    });
  };

  $scope.getUserNames();

  $scope.addUserToAlbum = function (user, album) {
    var userid = $scope.user.id;
    var albumid = $scope.album.id;
    console.log(userid, albumid);
    mediaService.addUserToAlbum(userid, albumid).then(function (response) {
      return response;
    });
  };
});
'use strict';

angular.module('app').controller('clientAlbumCtrl', function ($scope, mediaService, $stateParams) {

  $scope.test = "clientAlbum";

  $scope.getClientAlbum = function () {
    mediaService.getClientAlbum($stateParams.id).then(function (response) {
      $scope.photos = response;
    });
  };

  $scope.getClientAlbum();
});
"use strict";
'use strict';

angular.module('app').controller('clientHomeCtrl', function ($scope, mediaService, $stateParams) {

  $scope.test = "clientHome";

  $scope.getClientAlbums = function () {
    mediaService.getClientAlbums($stateParams.id).then(function (response) {
      $scope.albums = response;
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

  $scope.getMedia = function () {
    mediaService.getMedia().then(function (response) {
      $scope.media = response;
    });
  };

  $scope.getMedia();

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

angular.module('app').controller('photoAlbumCtrl', function ($scope, mediaService, $stateParams) {

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

  $scope.getSampleAlbum = function () {
    mediaService.getSampleAlbum($stateParams.id).then(function (response) {
      $scope.photos = response;
    });
  };

  $scope.getSampleAlbum();
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

angular.module('app').controller('videoAlbumCtrl', function ($scope, mediaService, $stateParams) {

  $scope.test = "videoAlbum";

  $scope.getSampleVideos = function () {
    mediaService.getSampleVideos($stateParams.id).then(function (response) {
      $scope.videos = response;
    });
  };

  $scope.getSampleVideos();
});
'use strict';

angular.module('app').controller('videosCtrl', function ($scope, mediaService, $stateParams) {

  $scope.test = "videos";

  $scope.getVideoSampleAlbums = function () {
    mediaService.getVideoSampleAlbums().then(function (response) {
      $scope.albums = response;
    });
  };

  $scope.getVideoSampleAlbums();
});
"use strict";
'use strict';

angular.module('app').service('mediaService', function ($http) {

  this.getMedia = function () {
    return $http.get('http://localhost:5350/api/allMedia').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getPhotoSampleAlbums = function () {
    return $http.get('http://localhost:5350/api/SamplePhotos').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getSampleAlbum = function (id) {
    return $http.get('http://localhost:5350/api/SamplePhotoAlbum/' + id).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getClientAlbums = function (id) {
    return $http.get('http://localhost:5350/api/ClientAlbums/' + id).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getClientAlbum = function (id) {
    return $http.get('http://localhost:5350/api/ClientAlbum/' + id).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getVideoSampleAlbums = function () {
    return $http.get('http://localhost:5350/api/SampleVideos').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getSampleVideos = function (id) {
    return $http.get('http://localhost:5350/api/SampleVideoAlbum/' + id).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getAllSampleAlbums = function () {
    return $http.get('http://localhost:5350/api/SampleAlbums').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.getAllClientAlbums = function () {
    return $http.get('http://localhost:5350/api/AllClientAlbums').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.addAlbum = function (album) {
    return $http.post('http://localhost:5350/api/AddAlbum', { name: album.name, date: album.date }).then(function (response) {
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

    return $http.post('http://localhost:5350/api/uploadImage', newImage);
  };

  this.getUserNames = function () {
    return $http.get('http://localhost:5350/api/UserNames').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.addUserToAlbum = function (userid, albumid) {
    return $http.post('http://localhost:5350/api/addUserToAlbum', { userid: userid, albumid: albumid });
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
