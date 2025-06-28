'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require('../framework/servicelocator');
var fs = require('fs');
var Jimp = require('jimp');

var ThumbnailHelper = function () {
    function ThumbnailHelper(logger) {
        (0, _classCallCheck3.default)(this, ThumbnailHelper);

        this.logger = logger;
    }

    (0, _createClass3.default)(ThumbnailHelper, [{
        key: 'syncThumbnails',
        value: function syncThumbnails(source, destination, options, callback) {
            var _this = this;

            if (!source || !destination) {
                this.logger.error('source and destination paths are required.');
                callback.error('source and destination paths are required.');
                return;
            }
            fs.lstat(source, function (err, stat) {

                if (err || !stat.isDirectory) {
                    _this.logger.error('source must be a directory path: ' + err);
                    callback.error('source must be a directory path: ' + err);
                    return;
                }
                fs.lstat(destination, function (errd, statd) {
                    if (errd || !statd.isDirectory) {
                        _this.logger.error('destination must be a directory path: ' + errd);
                        callback.error('destination must be a directory path: ' + errd);
                        return;
                    }
                    fs.readdir(source, function (err, srcItems) {
                        fs.readdir(destination, function (err, destItems) {
                            var thumbsToMake = srcItems.filter(function (itm) {
                                var found = destItems.find(function (e) {
                                    return e == itm;
                                });
                                if (!found) {
                                    return true;
                                }

                                return false;
                            });

                            var count = 0;
                            thumbsToMake.forEach(function (thumb) {
                                Jimp.read(source + '/' + thumb, function (err, img) {
                                    if (err) callback.error(err);
                                    if (img) {
                                        try {
                                            img.resize(120, Jimp.AUTO, Jimp.RESIZE_BEZIER).write(destination + '/' + thumb);
                                        } catch (e) {
                                            callback.error(e);
                                        }
                                    }
                                });
                                if (++count == thumbsToMake.length) {
                                    // Loger Not passing correctly to the Class. Server  Crashed on Creating Issue
                                    // this.logger.info('success syncing thumbnails');
                                    callback.success('success syncing thumbnails');
                                }
                            });
                        });
                    });
                });
            });
        }
    }]);
    return ThumbnailHelper;
}();

exports.default = ThumbnailHelper;
;