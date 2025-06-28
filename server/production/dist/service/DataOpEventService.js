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

var DataOpEventService = function () {
    function DataOpEventService() {
        (0, _classCallCheck3.default)(this, DataOpEventService);

        this.eventHandlers = new Map();
    }

    (0, _createClass3.default)(DataOpEventService, [{
        key: 'addCallback',
        value: function addCallback(listName, eventType, callback) {
            var criteria = listName + '=>' + eventType;
            // add to list per criteria
            var eList = this.eventHandlers.get(criteria);
            if (!eList) {
                eList = [];
            }
            eList.push(callback);
            this.eventHandlers.set(criteria, eList);
        }
    }, {
        key: 'trigger',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(listName, eventType, data) {
                var criteria, handlers, i, cb;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                criteria = listName + '=>' + eventType;
                                //console.log('Triggered: '+ criteria);

                                if (!this.eventHandlers.has(criteria)) {
                                    _context.next = 14;
                                    break;
                                }

                                handlers = this.eventHandlers.get(criteria);
                                //console.log('Triggered: '+ criteria + ' exists, count: '+ handlers.length);

                                i = 0;

                            case 4:
                                if (!(i < handlers.length)) {
                                    _context.next = 14;
                                    break;
                                }

                                cb = handlers[i];

                                if (!(cb && typeof cb === 'function')) {
                                    _context.next = 11;
                                    break;
                                }

                                _context.next = 9;
                                return cb(data);

                            case 9:
                                _context.next = 11;
                                break;

                            case 11:
                                i++;
                                _context.next = 4;
                                break;

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function trigger(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return trigger;
        }()
    }]);
    return DataOpEventService;
}();

exports.default = DataOpEventService;