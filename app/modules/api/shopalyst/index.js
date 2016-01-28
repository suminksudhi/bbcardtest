/**
 * Api end point for Shopalyst
 */
var request = require('request');
var ApiHandler = require('./../ApiHandler');
var config = require('./config');

var Shopalyst = function(){
    ApiHandler.call(this);
    this.BASEURL = config.BASEURL;
    this.APIKEY = config.APIKEY;
    this.DEFAULTINSPIRATION = config.DEFAULTINSPIRATION;
};

// subclass extends superclass
Shopalyst.prototype = Object.create(ApiHandler.prototype);
Shopalyst.prototype.constructor = Shopalyst;

/**
 * used to get inpiration details based on inspirationId
 * @param options
 * @returns {Shopalyst}
 */
Shopalyst.prototype.getInspiration = function(options,callback){
    var self=this;
    options = options || {};
    options.inspirationId = options.inspirationId || self.DEFAULTINSPIRATION;
    request.get({
        url: self.BASEURL+'/inspirations/'+options.inspirationId,
        qs: {apikey:self.APIKEY}, //Query string datas
    }, function(err,httpResponse,body){
        if(err){
            callback(err);
            self.emit('shopalyst-error',err);
            return self;
        }
        var inspiration = JSON.parse(body);
        callback(null,inspiration);
        self.emit('shopalyst-inspiration',inspiration);
    })
    return self;
};


/**
 * get the productlist by inspirationId
 * @param options
 * @returns {Shopalyst}
 */
Shopalyst.prototype.getProductList = function(options){
    var self=this;
    options = options || {};
    options.inspirationId = options.inspirationId || self.DEFAULTINSPIRATION;
    options.limit = options.limit || 10;
    options.index = options.index || 0;

    request.get({
        url: self.BASEURL+'/inspirations/'+options.inspirationId+'/shortlyst',
        qs: {apikey:self.APIKEY,limit:options.limit,index:options.index}, //Query string datas
    }, function(err,httpResponse,body){
        if(err){
            callback(err);
            self.emit('shopalyst-error',err);
            return self;
        }
        var productlist = JSON.parse(body);
        callback(null,productlist);
        self.emit('shopalyst-productList',productlist);
    })
    return self;
};

/**
 * get the product detail by productId
 * @param options
 * @returns {Shopalyst}
 */
Shopalyst.prototype.getProductDetail = function(options){
    var self=this;
    options = options || {};
    if(!options.productId) {
        self.emit('shopalyst-error', {msg: 'missing productId'});
        return self;
    }

    request.get({
        url: self.BASEURL+'/products/'+options.productId,
        qs: {apikey:self.APIKEY}, //Query string datas
    }, function(err,httpResponse,body){
        if(err){
            callback(err);
            self.emit('shopalyst-error',err);
            return self;
        }
        var productdetail = JSON.parse(body);
        callback(null,productdetail);
        self.emit('shopalyst-productDetail',productdetail);
    })
    return self;
};

module.exports = Shopalyst;

