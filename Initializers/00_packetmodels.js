/**
 * Created by Eddie on 6/7/2017.
 */
var Parser = require('binary-parser').Parser;
var StringOptions = {length: 99, zeroTerminated:true};

module.exports = PacketModels = {
    header: new Parser().skip(1)
        .string("command", StringOptions),
    login: new Parser().skip(1)
        .string("command", StringOptions)
        .string("username", StringOptions)
        .string("password", StringOptions),
    register: new Parser().skip(1)
        .string("command", StringOptions)
        .string("username", StringOptions)
        .string("password", StringOptions),
    pos: new Parser().skip(1)
        .string("command", StringOptions)
        .int32le("target_x", StringOptions)
        .int32le("target_y", StringOptions),
    stat: new Parser().skip(1)
        .string("command", StringOptions)
        .string("statName", StringOptions)
        .int32le("newStatValue", StringOptions),
    iattack: new Parser().skip(1)
        .string("command", StringOptions)
        .string("username", StringOptions)
        .int32le("damage", StringOptions),
    reborn: new Parser().skip(1)
        .string("command", StringOptions)
        .string("username", StringOptions),
    item: new Parser().skip(1)
        .string("command", StringOptions)
        .int32le("invCol", StringOptions)
        .int32le("invRow", StringOptions)
        .int32le("itemId", StringOptions)
        .int32le("quantity", StringOptions)

};
