var events = require("events");
var util= require("util");
var fs = require('fs');


/**
 * Main ApiHandler module
 * @constructor
 */
function ApiHandler(){
    events.EventEmitter.call(this);
}

ApiHandler.prototype = new events.EventEmitter();
ApiHandler.constructor = ApiHandler;

//used to scrape data from websites
ApiHandler.prototype.handle = function(){};
module.exports = ApiHandler;