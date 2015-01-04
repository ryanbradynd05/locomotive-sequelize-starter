'use strict';

var fs = require('fs'),
    path = require('path'),
    async = require('async'),
    Sequelize = require("sequelize");

module.exports = function(done) {
    var sequelize = new Sequelize(null, null, null, {
        dialect: 'sqlite',
        storage: 'database/dev.db',
        logging: this.env == 'development' ? console.log : false
    });

    var migrator = sequelize.getMigrator({
        path: 'migrations',
        filesFilter: /\.js$/
    });

    console.log('Start sequelize migrations');
    migrator.migrate({
            method: 'up'
        })
        .then(function() {
            console.log('Sequelize migrations complete');
            done();
        });
};