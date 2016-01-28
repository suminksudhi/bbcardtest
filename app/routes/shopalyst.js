var express = require('express'),
    mainRouter = express.Router(),
    path = require('path'),
    pkg = require(path.join(__dirname, '../../package.json')), //get the options from the package.json
    Api = require('../modules/api');

var $shopalyst = Api('shopalyst');


/* GET home page. */
mainRouter.get(['/inspiration','/inspiration/:inspirationId'], function (req, res, next) {
    var inspirationId=req.params.inspirationId;
    $shopalyst.getInspiration({inspirationId:inspirationId},function(err,data){
        if(err)
           return res.json(err);
        res.json(data);
    });//trigger inspiration fetch
    /**
     * observer model
        $shopalyst.on('shopalyst-inspiration',function(data){
            res.json(data);
        });

        $shopalyst.on('shopalyst-error',function(err){
            res.json(err);
        });
     **/
    // res.render('index', {title: pkg.appName, desc: pkg.description, author: pkg.author});
});

/* GET home page. */
mainRouter.get(['/productlist','/productlist/:inspirationId','/productlist/:inspirationId/:start/:limit'], function (req, res, next) {
    var inspirationId=req.params.inspirationId,
        index=req.params.start || 0,
        limit=req.params.limit || 10;
    $shopalyst.getProductList({inspirationId:inspirationId,limit:limit,index:index},function(err,data){
        if(err)
            return res.json(err);
        res.json(data);
    });//trigger inspiration fetch

    /**
     *
    $shopalyst.on('shopalyst-productList',function(data){
        res.json(data);
    });

    $shopalyst.on('shopalyst-error',function(err){
        res.json(err);
    });

     */

    // res.render('index', {title: pkg.appName, desc: pkg.description, author: pkg.author});
});

/* GET home page. */
mainRouter.get('/productdetails/:productId', function (req, res, next) {
    var productId=req.params.productId;
    $shopalyst.getProductDetail({productId:productId},function(err,data){
        if(err)
            return res.json(err);
        res.json(data);
    });//trigger inspiration fetch

    /**
    $shopalyst.on('shopalyst-productDetail',function(data){
        res.json(data);
    });

    $shopalyst.on('shopalyst-error',function(err){
        res.json(err);
    });
     **/

    // res.render('index', {title: pkg.appName, desc: pkg.description, author: pkg.author});
});

module.exports = mainRouter;
