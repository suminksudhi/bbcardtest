/**
 * Created by nanobi on 28/7/15.
 */
var crypto = require('crypto');
var prop = require('properties-parser');


/**
 *
 * @param len
 * @returns {string}
 */
function randomString (len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')   // convert to base64 format
        .slice(0, len)        // return required number of characters
        .replace(/\+/g, '0')  // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
}
var properties = {
    getProperties:function(callback){
        var propertyfile = process.cwd() +'/config/application.properties';
        prop.read(propertyfile, function(err, data) {
            if(err){
                callback(err);
                return;
            }
            callback(data);
        });
    }
}


module.exports.randomString = randomString;
module.exports=properties;