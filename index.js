const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const config = require('./config');

var conn = massive.connectSync({
  connectionString : "postgres://postgres:" + config.postgresPass + "@localhost/tyler_little"
});



// App definition
const app = module.exports = express();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(cors());

// Expanding server capacity
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Controllers
app.set('db', conn);
const db = app.get('db');

const serverCtrl = require('./serverCtrl');


//////////////////////////////////////////////////////

// API
// get media
app.get('/api/allMedia', serverCtrl.getMedia)
// get SampleAlbums by type for photos view
app.get('/api/SamplePhotos', serverCtrl.getPhotoSampleAlbums)
// get media by SampleAlbums id for photo album view
app.get('/api/SamplePhotoAlbum/:id', serverCtrl.getSampleAlbum)
// get ClientAlbums by Client by client albums view
app.get('/api/ClientAlbums/:id', serverCtrl.getClientAlbums)
// get media by Client Album for photo album view
app.get('/api/ClientAlbum/:id', serverCtrl.getClientAlbum)
// get SampleAlbums by type for videos view
app.get('/api/SampleVideos', serverCtrl.getVideoSampleAlbums)
// get media by SampleAlbums id for video album view
app.get('/api/SampleVideoAlbum/:id', serverCtrl.getSampleVideos)
// get albums list of names and rename name columns
app.get('/api/SampleAlbums', serverCtrl.getAllSampleAlbums)
app.get('/api/AllClientAlbums', serverCtrl.getAllClientAlbums)
// post to insert complete row in client album
app.post('/api/AddAlbum', serverCtrl.addAlbum)
// post to update users id to client album
// post to insert media and integrate with S3



// Connections
var portNum = 5350;


app.listen(portNum, function () {
    console.log('Welcome to port:', portNum);
});
