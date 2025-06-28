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

// dependsOn: 

var SODOPValidator = function () {
    function SODOPValidator() {
        (0, _classCallCheck3.default)(this, SODOPValidator);
    }

    (0, _createClass3.default)(SODOPValidator, [{
        key: 'validatemsgListRequest',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(reqObj, user) {
                var result, SODObj, employee, day, SODModel, duplicateCheck, prevCheck, proposedSODDay, count, prevSOD, jpModel, prevDate, jps, i, jp, br, j, newSOD;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                result = { valid: true };
                                SODObj = {};

                                if (!(reqObj && reqObj.hasOwnProperty('optParam1'))) {
                                    _context.next = 6;
                                    break;
                                }

                                SODObj = reqObj.optParam1;
                                _context.next = 7;
                                break;

                            case 6:
                                return _context.abrupt('return', result);

                            case 7:
                                if (!(reqObj.code == null || reqObj.code == '')) {
                                    _context.next = 52;
                                    break;
                                }

                                if (!(SODObj.hasOwnProperty('day') && SODObj.hasOwnProperty('employee'))) {
                                    _context.next = 52;
                                    break;
                                }

                                employee = SODObj.employee;
                                day = SODObj.day;
                                SODModel = ServiceLocator.resolve('SODModel');
                                duplicateCheck = false;
                                prevCheck = false;
                                proposedSODDay = day;

                                // Case: Dis-allow creation of SOD with existing (day & employee)   

                                _context.next = 17;
                                return SODModel.find({ employee: employee, day: day }).limit(1).countDocuments().exec();

                            case 17:
                                count = _context.sent;

                                if (count > 0) {
                                    console.log('ValidateSOD: Duplicate SOD request exists:' + count + ' ignoring for: ' + employee + ', ' + day);
                                } else {
                                    duplicateCheck = true;
                                }

                                // Case: Do not create new SOD if previous SOD is not finished
                                _context.next = 21;
                                return SODModel.findOne({ employee: employee }).sort({ day: -1 }).exec();

                            case 21:
                                prevSOD = _context.sent;


                                if (prevSOD == null || prevSOD != null && prevSOD.end != null) {
                                    prevCheck = true;
                                }

                                result.valid = duplicateCheck && prevCheck;

                                // Case: if a work plan exist for a day between previous SOD and current day-
                                //       -then create SOD for the day with previous work plan

                                // check only if we are creating a new SOD in result of all previous checks to be valid

                                if (!result.valid) {
                                    _context.next = 51;
                                    break;
                                }

                                jpModel = ServiceLocator.resolve('JourneyPlanModel');

                                // Get previous 'Journey plan's till previous SOD or from beginning

                                prevDate = new Date(0); // start from the creation of world

                                if (prevSOD) {
                                    prevDate = new Date(prevSOD.day);
                                }

                                _context.next = 30;
                                return jpModel.find({ 'user.id': user._id, date: { $gt: prevDate, $lt: day } });

                            case 30:
                                jps = _context.sent;

                                if (!jps.length) {
                                    _context.next = 51;
                                    break;
                                }

                                i = 0;

                            case 33:
                                if (!(i < jps.length)) {
                                    _context.next = 51;
                                    break;
                                }

                                jp = jps[i];
                                br = false;

                                if (!(jp.tasks && jp.tasks.length)) {
                                    _context.next = 48;
                                    break;
                                }

                                j = 0;

                            case 38:
                                if (!(j < jp.tasks.length)) {
                                    _context.next = 46;
                                    break;
                                }

                                if (!(!jp.tasks[j].status || jp.tasks[j].status && jp.tasks[j].status != 'Finished')) {
                                    _context.next = 43;
                                    break;
                                }

                                proposedSODDay = jp.date; // Todo: jp is created by WebUI their Tz may not match the App Tz so day can go bad
                                br = true;
                                return _context.abrupt('break', 46);

                            case 43:
                                ++j;
                                _context.next = 38;
                                break;

                            case 46:
                                if (!br) {
                                    _context.next = 48;
                                    break;
                                }

                                return _context.abrupt('break', 51);

                            case 48:
                                ++i;
                                _context.next = 33;
                                break;

                            case 51:

                                if (proposedSODDay != day) // if another day was proposed send the other one
                                    {
                                        // clone SODObj
                                        newSOD = JSON.parse(JSON.stringify(SODObj));


                                        newSOD.day = proposedSODDay;
                                        reqObj.optParam1 = newSOD;
                                        result.newObj = reqObj;
                                    }

                            case 52:
                                return _context.abrupt('return', result);

                            case 53:
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
    return SODOPValidator;
}();

exports.default = SODOPValidator;