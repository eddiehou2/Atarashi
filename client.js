/**
 * Created by Eddie on 6/6/2017.
 */
var now = require('performance-now');
var _ = require('underscore');

module.exports = function() {

    // These objects will be added at runtime...
    // this.socket = {}
    // this.user = {}

    var client = this;
    // Initialization
    this.initiate = function() {

        // Send the connection handshake packet to the client
        client.socket.write(packet.build(["HELLO", now().toString()]));
        console.log('Client initiated');
    };

    // Client methods
    this.enterRoom = function(selected_room) {
        maps[selected_room].clients.forEach(function(otherClient) {
           otherClient.socket.write(packet.build(["ENTER", client.user.username, client.user.pos_x, client.user.pos_y]));
        });

        maps[selected_room].clients.push(client);
    };

    this.broadcastRoom = function(packetData) {
        maps[client.user.current_room].clients.forEach(function(otherClient) {
           if (otherClient.user.username != client.user.username) {
               otherClient.socket.write(packetData);
           }
        });
    };

    // Socket stuff
    this.data = function(data) {
        packet.parse(client, data);
    };

    this.error = function(error) {
        console.log("Client error: " + error.toString());

    };

    this.end = function() {
        console.log("Client closed");
    };
};