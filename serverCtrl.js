const app = require('./index');
const db = app.get('db');
const AWS = require('aws-sdk');
const config = require('./config');

AWS.config.update({
    accessKeyId: config.amazonAccess
  , secretAccessKey: config.amazonSecret
  , region: config.amazonRegion
});

const s3 = new AWS.S3();

var location = ''

module.exports = {

    getMedia: function(req, res, next) {
      db.getMedia(function(err, media) {
        res.status(200).send(media)
      })
    },
    getPhotoSampleAlbums: function(req, res, next) {
      db.getPhotoSampleAlbums(function(err, albums) {
        res.status(200).send(albums)
      })
    },
    getAllSampleAlbums: function(req, res, next) {
      db.getAllSampleAlbums(function(err, albums) {
        res.status(200).send(albums)
      })
    },
    getSampleAlbum: function(req, res, next) {
      db.getSampleAlbum([req.params.id], function(err, photos) {
        res.status(200).send(photos)
      })
    },
    getClientAlbums: function(req, res, next) {
      db.getClientAlbums([req.params.id], function(err, albums) {
        res.status(200).send(albums)
      })
    },
    getClientAlbum: function(req, res, next) {
      db.getClientAlbum([req.params.id], function(err, photos) {
        res.status(200).send(photos)
      })
    },
    getVideoSampleAlbums: function(req, res, next) {
      db.getVideoSampleAlbums(function(err, albums) {
        res.status(200).send(albums)
      })
    },
    getSampleVideos: function(req, res, next) {
      db.getSampleVideos(function(err, photos) {
        res.status(200).send(photos)
      })
    },
    getVideoById: function(req, res, next) {
      db.getVideoById([req.params.id], function(err, video) {
        res.status(200).send(video)

      })
    },
    getYoutube: function(req, res, next) {
      db.getYoutube(function(err, videos) {
        res.status(200).send(videos)
      })
    },
    getVimeo: function(req, res, next) {
      db.getVimeo(function(err, videos) {
        res.status(200).send(videos)
      })
    },
    getAllClientAlbums: function(req, res, next) {
      db.getAllClientAlbums(function(err, albums) {
        res.status(200).send(albums)
      })
    },
    addAlbum: function(req, res, next) {
      db.addAlbum([req.body.name, req.body.date], function(err, added) {
        res.status(200).send(added)
      })
    },
    uploadImage: function (req, res, next) {
      var buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

      var params = {
          Bucket: 'tyler-little-photography'
        , Key: req.body.imageName
        , Body: buf
        , ContentType: 'image/' + req.body.imageExtension
        , ACL: 'public-read'
      };

      s3.upload(params, function (err, data) {
        console.log(data.Location);
        // location = data.Location;
        if (err) return res.status(500).send(err);
        console.log(req.body.type, data.Location, req.body.clientId, req.body.sampleId);
        db.addMedia([req.body.type, data.Location, req.body.clientId, req.body.sampleId], function(err, added) {
          res.status(200).send(added)
        })
      });
    },
    addMedia: function (req, res, next) {
    console.log(req.body.type, location, req.body.clientId, req.body.sampleId);
    db.addMedia([req.body.type, location, req.body.clientId, req.body.sampleId], function(err, added) {
      res.status(200).send(added)
      })
    },
    getUserNames: function(req, res, next) {
      db.getUserNames(function(err, names) {
        res.status(200).send(names)
      })
    },
    addAlbumToUser: function(req, res, next) {
      db.addAlbumToUser([req.body.userid, req.body.albumid], function(err, updated) {
        res.status(200).send(updated)
      })
    }



}
