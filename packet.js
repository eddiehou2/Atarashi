/**
 * Created by Eddie on 6/6/2017.
 */
var zeroBuffer = new Buffer('00', 'hex');


module.exports = packet = {

    // Params: an array of javascript objects to be turned into buffers
    build: function(params) {
        var packetParts = [];
        var packetSize = 0;

        params.forEach(function(param) {
           var buffer;

           if (typeof param === 'string') {
               buffer = new Buffer(param, 'utf8');
               buffer = Buffer.concat([buffer, zeroBuffer], buffer.length + 1);
           }
           else if (typeof param === 'number') {
                buffer = new Buffer(2);
                buffer.writeUInt16LE(param, 0);
           }
           else {
               console.log("WARNING: Unknown data type in packet builder!");
           }
           packetSize += buffer.length;
           packetParts.push(buffer);
        });

        var dataBuffer = Buffer.concat(packetParts, packetSize);

        var size = new Buffer(1);
        size.writeUInt8(dataBuffer.length + 1, 0);

        var finalPacket = Buffer.concat([size, dataBuffer], size.length + dataBuffer.length);

        return finalPacket;
    },

    // Parse a packet to be handled for a client
    parse: function(client, data) {

        var index = 0;
        while (index < data.length) {
            var packetSize = data.readUInt8(index)
            var extractedPacket = new Buffer(packetSize);
            data.copy(extractedPacket, 0, index, index + packetSize);

            this.interpret(client, extractedPacket);

            index += packetSize;
        }

    },

    interpret: function(client, dataPacket) {

        var header = PacketModels.header.parse(dataPacket);
        console.log("Interpret: " + header.command);

        switch (header.command.toUpperCase()) {
            case "LOGIN":
                var data = PacketModels.login.parse(dataPacket);
                User.login(data.username, data.password, function(result, user) {
                   if (result) {
                       client.user = user;
                       client.enterRoom(client.user.current_room);
                       client.socket.write(packet.build(["LOGIN", "TRUE", client.user.current_room, client.user.pox_x, client.user.pox_y, client.user.username]));
                   }
                   else {
                       client.socket.write(packet.build(["LOGIN", "FALSE"]));
                   }
                });
                break;
            case "REGISTER":
                var data = PacketModels.register.parse(dataPacket);
                User.register(data.username, data.password, function(result) {
                    if (result) {
                        client.socket.write(packet.build(["REGISTER", "TRUE"]));
                    }
                    else {
                        client.socket.write(packet.build(["REGISTER", "FALSE"]));
                    }
                });
                break;
        }

    }

}