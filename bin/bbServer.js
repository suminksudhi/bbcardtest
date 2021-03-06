#!/usr/bin/env node
/**
 * Module dependencies.
 */
var http = require('http'),
    cluster = require('cluster'), //for cluster app to utilize all cores
    program = require('commander'), //for commandline utility
    path = require('path'),
    chalk = require('chalk'),
    pkg = require(path.join(__dirname, '../package.json')), //get the options from the package.json
    debug = require('debug')(pkg.name + ':server:log');
debugErr = require('debug')(pkg.name + ':server:error');


/**
 * command line utility expectations
 */
program
    .version(pkg.version)
    .description('Description:\n\t run the ' + pkg.name + ' application')
    .option('-p, --port <port>', 'Port on which to listen to (defaults to 3000)', parseInt)
    .option('-s, --socket <port>', 'Port on which socketServer will listen to (defaults to 3000)', parseInt)

//program
//    .command('uninstall', 'uninstall the application')
//    .command('install', 'install the application as service');

program
    .command('setup [env]')
    .description('run setup commands for all envs')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action(function (env, options) {
        var mode = options.setup_mode || "normal";
        env = env || 'all';
        process.env.NODE_ENV = env;
        if (cluster.isMaster) {
            console.log('setup for %s env(s) with %s mode', env, mode);
        }
    }).on('--help', function () {
        console.log('  Examples:');
        console.log();
        console.log('    $ deploy exec sequential');
        console.log('    $ deploy exec async');
        console.log();
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    if (cluster.isMaster) {
        program.outputHelp();
    }
}
;

var port = program.port || 3000;


// Code to run if we're in the master process
if (cluster.isMaster) {

    process.env.DEBUG = ((process.env.DEBUG) ? process.env.DEBUG + ',' : '') + pkg.name + ':server:*';
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    //for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
    //}

// Code to run if we're in a worker process
} else {

    var app = require('./../'); //the app handler
    /**
     * global listener to every request
     */
    app.use(function (req, res, next) {
        console.log('Worker ' + cluster.worker.id + ' running!');
        next();
    });

    cluster.on('exit', function (worker) {
        // Replace the dead worker,
        // we're not sentimental
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });

    /**
     * Create HTTP server.
     */
    var server = http.createServer(app);
    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
        if (error.syscall === 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(chalk.red(bind + ' requires elevated privileges'));
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.log(chalk.red(bind + ' is already in use'));
                process.exit(1);
                break;
            default:
                throw error;
        }
        exit(1);
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Worker ' + cluster.worker.id + ' Listening on ' + bind);
    }
}
