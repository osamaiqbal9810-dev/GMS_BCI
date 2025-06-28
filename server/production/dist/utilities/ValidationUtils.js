'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationUtils = function () {
    //SODObj.hasOwnProperty('employee')
    //if (typeof target == "object" && typeof source == "object" && !(source instanceof Array) ) {
    function ValidationUtils() {
        (0, _classCallCheck3.default)(this, ValidationUtils);
    }

    (0, _createClass3.default)(ValidationUtils, [{
        key: 'notNull',
        value: function notNull(obj) {
            if (obj != null) {
                return true;
            }

            return false;
        }
    }, {
        key: 'ensureValid',
        value: function ensureValid(obj, classType) {
            if (this.notNull(obj) && (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) == 'object' && obj instanceof classType) {
                return true;
            }

            return false;
        }
    }, {
        key: 'ensureContains',
        value: function ensureContains(obj) {
            var valid = this.notNull(obj);

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            args.forEach(function (f) {
                valid = valid && obj && obj.hasOwnProperty(f);
            });

            return valid;
        }
    }, {
        key: 'getOptional',
        value: function getOptional(obj, field) {
            if (this.ensureContains(obj, field)) {
                return obj[field];
            }

            return '';
        }
    }]);
    return ValidationUtils;
}();

exports.default = ValidationUtils;