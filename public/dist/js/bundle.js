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

angular.module('app').controller('mainCtrl', function ($scope, mediaService) {

  $scope.getMedia = function () {
    mediaService.getMedia().then(function (response) {
      $scope.media = response;
    });
  };

  $scope.getMedia();
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

angular.module('app').controller('photosCtrl', function ($scope, mediaService) {

  $scope.test = "photos";

  $scope.getPhotoSampleAlbums = function () {
    mediaService.getPhotoSampleAlbums().then(function (response) {
      $scope.albums = response;
    });
  };

  $scope.getPhotoSampleAlbums();
});
"use strict";
'use strict';

angular.module('app').controller('signinCtrl', function ($scope) {

  $scope.test = "signin";
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
});
"use strict";
//# sourceMappingURL=bundle.js.map
