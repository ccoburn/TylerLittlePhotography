angular.module('app').service('mediaService', function($http) {

  this.getMedia = function() {
    return $http.get('/api/allMedia').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getPhotoSampleAlbums = function() {
    return $http.get('/api/SamplePhotos').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getSampleAlbum = function(id) {
    return $http.get('/api/SamplePhotoAlbum/' + id).then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getClientAlbums = function(id) {
    return $http.get('/api/ClientAlbums/' + id).then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getClientAlbum = function(id) {
    return $http.get('/api/ClientAlbum/' + id).then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getVideoSampleAlbums = function() {
    return $http.get('/api/SampleVideos').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getSampleVideos = function() {
    return $http.get('/api/Videos').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getVideoById = function(id) {
    return $http.get('/api/Video/' + id).then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getYoutube = function() {
    return $http.get('/api/VideosYoutube').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getVimeo = function() {
    return $http.get('/api/VideosVimeo').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getAllSampleAlbums = function() {
    return $http.get('/api/SampleAlbums').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.getAllClientAlbums = function() {
    return $http.get('/api/AllClientAlbums').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.addAlbum = function(album) {
    return $http.post('/api/AddAlbum', {name: album.name, date: album.date}).then(function(response) {
      console.log(album);
      return response;
    })
  }

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
    }

    return $http.post('/api/uploadImage', newImage)
  }

  this.getUserNames = function() {
    return $http.get('/api/UserNames').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  this.addAlbumToUser = function(userid, albumid) {
    return $http.post('/api/addAlbumToUser', {userid: userid, albumid: albumid})
  }


})
