/**
 * Created by Eddie on 6/10/2017.
 */
var mongoose = require('mongoose');

var inventorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    itemId: Number,
    quantity: Number,
    invCol: Number,
    invRow: Number
});
inventorySchema.index({user: 1, invCol: 1, invRow: 1}, {unique: true});

inventorySchema.statics.updateInventory = function(user, invCol, invRow, itemId, quantity, cb) {

    Inventory.findOne({user: user._id, invCol: invCol, invRow: invRow}, function(error, inventoryItem) {
        if (!error && inventoryItem) {
            inventoryItem.itemId = itemId;
            inventoryItem.quantity = quantity;
            inventoryItem.save(function(error) {
                if (!error) {
                    cb(true);
                }
                else {
                    cb(false);
                }
            });
        }
        else {
            var new_inventoryItem = new Inventory({
                user: user._id,
                itemId: itemId,
                quantity: quantity,
                invCol: invCol,
                invRow: invRow
            });
            new_inventoryItem.save(function(error) {
               if (!error) {
                   cb(true);
               }
               else {
                   cb(false);
               }
            });
        }
    });

};

inventorySchema.statics.retrieveAll = function(user, cb) {

    Inventory.find({user: user._id}, function(error, inventoryItems) {
        if (!error && inventoryItems) {
            cb(inventoryItems);
        }
    });

};


module.exports = Inventory = gamedb.model('Inventory', inventorySchema);