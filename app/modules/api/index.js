var path = require('path');
$apiInstanceArray = {};
/**
 * just a facet to avoid direct interation with api base
 * @param $instance
 * @returns {_require|*}
 * @constructor
 */
var Api = function($name){
    try{
        if(!$apiInstanceArray[$name]) {
            $instance = require(path.join(__dirname, $name));
            $apiInstanceArray[$name] = new $instance();
        }
        return $apiInstanceArray[$name];
    }catch(e){
        throw e
    }
}

module.exports = Api
