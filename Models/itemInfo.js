/**
 * Created by Eddie on 6/30/2017.
 */
/**
 * Created by Eddie on 6/6/2017.
 */
var mongoose = require('mongoose');

var itemInfoSchema = new mongoose.Schema({
    itemId: {type: Number, unique: true, required: true},
    itemName: {type: String, required: true},
    itemType: {type: String, required: true},
    itemSprite: {type: String, required: true},
    levelReq: Number,
    strReq: Number,
    intReq: Number,
    dexReq: Number,
    curHP: Number,
    curMP: Number,
    curExp: Number,
    curStr: Number,
    curInt: Number,
    curDex: Number,
    curMovementSpeed: Number,
    curPhysicalAttack: Number,
    curPhysicalAttackSpeed: Number,
    curPhysicalDefense: Number,
    curMagicalAttack: Number,
    curMagicalAttackSpeed: Number,
    curMagicalDefense: Number,
    curDuration: Number,
    statHP: Number,
    statMP: Number,
    statStr: Number,
    statInt: Number,
    statDex: Number,
    statMovementSpeed: Number,
    statPhysicalAttack: Number,
    statPhysicalAttackSpeed: Number,
    statPhysicalDefense: Number,
    statMagicalAttack: Number,
    statMagicalAttackSpeed: Number,
    statMagicalDefense: Number,
});

itemInfoSchema.statics.getItemInfo = function(itemId, cb) {

    ItemInfo.findOne({itemId:itemId}, function(error, itemInfo) {
       if (!error && itemInfo) {
           cb(true, itemInfo);
       }
       else {
           cb(false, null);
       }
    });

};

module.exports = ItemInfo = gamedb.model('ItemInfo', itemInfoSchema);