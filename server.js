/**
 * Created by Eddie on 6/6/2017.
 */
// Import required libraries
require(__dirname + '/Resources/config.js');
var fs = require('fs');
var net = require('net');

// Load the initializers
var init_files = fs.readdirSync(__dirname + "/Initializers");
init_files.forEach(function(initFile) {
   console.log('Loading Initializers: ' + initFile);
   require(__dirname + "/Initializers/" + initFile);
});

// Load the models
var model_files = fs.readdirSync(__dirname + "/Models");
model_files.forEach(function(modelFile) {
    console.log('Loading Model: ' + modelFile);
    require(__dirname + "/Models/" + modelFile);
});

// Load model_files maps
maps = {};
var map_files = fs.readdirSync(config.data_paths.maps);
map_files.forEach(function(mapFile) {
    console.log('Loading Map: ' + mapFile);
    var map = require(config.data_paths.maps + mapFile);
    maps[map.room] = map;
});

net.createServer(function(socket) {
    console.log("Socket connected");

    socket.on('error', function(err) {
        console.log("Socket error: " + error.toString());
    });

    socket.on('end', function() {
        console.log("Socket closed");
    });

    socket.on('data', function(data) {
        console.log("Socket data: " + data.toString());
    });

}).listen(config.port);

console.log("Initialize Completed, Server running on port: " + config.port + " for environment: " + config.environment);



// 1. load the initializers
// 2. load data models
// 3. load game maps data
// 4. initiate the server and listen to the internets
    // all of server logic