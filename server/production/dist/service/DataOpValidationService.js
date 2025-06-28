'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require('../framework/servicelocator');

// dependsOn: SODValidationService

var DataOpValidationService = function () {
    function DataOpValidationService(logger) {
        (0, _classCallCheck3.default)(this, DataOpValidationService);

        this.logger = logger;
    }

    (0, _createClass3.default)(DataOpValidationService, [{
        key: 'validatemsgListRequest',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(reqObj, user) {
                var result, sodValidator;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                result = { valid: true };

                                // SOD logic is discontinued, so following validation is no longer required.

                                if (!(reqObj.hasOwnProperty('listName') && reqObj.listName == 'SOD')) {
                                    _context.next = 8;
                                    break;
                                }

                                console.log('Warning: An app is trying to create SOD, old version, user:' + user.email);
                                this.logger.warn('Warning: An app is trying to create SOD, old version, user:' + user.email);
                                sodValidator = ServiceLocator.resolve('SODOpValidator');
                                _context.next = 7;
                                return sodValidator.validatemsgListRequest(reqObj, user);

                            case 7:
                                result = _context.sent;

                            case 8:
                                return _context.abrupt('return', result);

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function validatemsgListRequest(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return validatemsgListRequest;
        }()
    }]);
    return DataOpValidationService;
}();

exports.default = DataOpValidationService;