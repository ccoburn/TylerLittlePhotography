const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const config = require('./config');

// var conn = massive.connectSync({
//   connectionString : "postgres://postgres:" + config.postgresPass + "@localhost/tyler_little"
// });



// App definition
const app = module.exports = express();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(cors());

// Expanding server capacity
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Controllers
// app.set('db', conn);
// const db = app.get('db');

const serverCtrl = require('./serverCtrl');


//////////////////////////////////////////////////////

// API





// Connections
var portNum = 5350;


app.listen(portNum, function () {
    console.log('Welcome to port:', portNum);
});
