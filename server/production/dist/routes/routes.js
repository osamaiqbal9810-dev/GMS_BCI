'use strict';

//var indexRouter = require('./index');
var api_routes = require('./api-routes');
//let fallback = require('express-history-api-fallback');

var express = require('express');
var path = require('path');

module.exports = function (app) {
	app.use('/api', api_routes);
	//app.get('/',  indexRouter );
};