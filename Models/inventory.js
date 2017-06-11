/**
 * Created by Eddie on 6/10/2017.
 */
var mongoose = require('mongoose');

var inventorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    invType: String,
    items: [{
        itemName: String,
        quantity: Number
    }]
});

inventorySchema.statics.pickUpItem = function(user, invType, itemName, quantity, cb) {

    Inventory.findOne({user: user._id, invType: invType}, function(error, inventory) {
        var updated = false;
        if (!error && inventory) {
            inventory.items.forEach(function(item) {
                if (item.itemName == itemName) {
                    updated = true;
                    item.quantity += quantity;
                }
            });
            if (!updated) {
                inventory.items.push({itemName:itemName, quantity:quantity});
            }
            inventory.save(function(error) {
                if (!error) {
                    cb(true);
                }
                else {
                    cb(false);
                }
            });
        }
        else {
            // Error || User doesn't exist
            cb(false);
        }
    });

};

inventorySchema.statics.dropItem = function(user, invType, itemName, quantity, cb) {

    Inventory.findOne({user: user._id, invType: invType}, function(error, inventory) {
        if (!error && inventory) {
            var newInventoryItems = [];
            inventory.items.forEach(function(item) {
                if (item.itemName != itemName) {
                    newInventoryItems.push(item);
                }
                else if (item.itemName == itemName && item.quantity > 1) {
                    item.quantity -= 1;
                    newInventoryItems.push(item);
                }
            });
            inventory.items = newInventoryItems;

            inventory.save(function(error) {
                if (!error) {
                    cb(true);
                }
                else {
                    cb(false);
                }
            });
        }
        else {
            // Error || User doesn't exist
            cb(false);
        }
    });


};


module.exports = Inventory = gamedb.model('Inventory', inventorySchema);