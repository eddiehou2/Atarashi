/**
 * Created by Eddie on 6/26/2017.
 */
var mongoose = require('mongoose');

var equipmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    itemId: Number,
    slot: Number
});
equipmentSchema.index({user: 1, slot: 1}, {unique: true});

equipmentSchema.statics.updateEquipment = function(user, slot, itemId, cb) {

    if (itemId == -1) {
        Equipment.remove({user:user._id, slot: slot}, function(error) {
            if (!error) {
                cb(true);
            }
            else {
                cb(false);
            }
        });

    }
    else {
        Equipment.findOne({user: user._id, slot: slot}, function (error, equipmentItem) {
            if (!error && equipmentItem) {
                equipmentItem.itemId = itemId;
                equipmentItem.save(function (error) {
                    if (!error) {
                        cb(true);
                    }
                    else {
                        cb(false);
                    }
                });
            }
            else {
                var new_equipmentItem = new Equipment({
                    user: user._id,
                    itemId: itemId,
                    slot: slot
                });
                new_equipmentItem.save(function (error) {
                    if (!error) {
                        cb(true);
                    }
                    else {
                        cb(false);
                    }
                });
            }
        });
    }

};

equipmentSchema.statics.retrieveAll = function(user, cb) {

    Equipment.find({user: user._id}, function(error, equipmentItems) {
        if (!error && equipmentItems) {
            cb(equipmentItems);
        }
    });

};


module.exports = Equipment = gamedb.model('Equipment', equipmentSchema);