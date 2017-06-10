/**
 * Created by Eddie on 6/6/2017.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    sprite: String,
    current_room: String,
    pos_x: Number,
    pos_y: Number,
    max_hp: Number,
    cur_hp: Number,
    max_mp: Number,
    cur_mp: Number,
    level: Number,
    exp: Number
});

userSchema.statics.register = function(username, password, cb) {

    var new_user = new User({
        username: username,
        password: password,
        sprite: "spr_Hero",
        current_room: maps[config.starting_zone].room,
        pos_x: maps[config.starting_zone].start_x,
        pos_y: maps[config.starting_zone].start_y,
        max_hp: 100,
        cur_hp: 50,
        max_mp: 100,
        cur_mp: 50,
        level: 1,
        exp: 0
    });

    new_user.save(function(error) {
        if (!error) {
            cb(true);
        }
        else {
            cb(false);
        }
    });

};

userSchema.statics.login = function(username, password, cb) {

    User.findOne({username: username}, function(error, user) {
        if (!error && user) {
            if (user.password == password) {
                cb(true, user);
            }
            else {
                cb(false, null);
            }
        }
        else {
            // Error || User doesn't exist
            cb(false, null);
        }
    });

};

module.exports = User = gamedb.model('User', userSchema);