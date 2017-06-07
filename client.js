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

    this.initiate = function() {

        // Send the connection handshake packet to the client
        client.socket.write(packet.build(["HELLO", now().toString()]));
        console.log('Client initiated');
    }

    this.data = function(data) {
        packet.parse(client, data);
    }

    this.error = function(error) {
        console.log("Client error: " + error.toString());

    }

    this.end = function() {
        console.log("Client closed");
    }
}