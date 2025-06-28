"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.data_03_Result = exports.data_03 = exports.data_02_Result = exports.data_02 = exports.data_01_Result = exports.data_01 = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data_01 = exports.data_01 = [{
  user: {
    id: "5c6ab1b5df7e145524e93d0e",
    name: "Sort Supervisor",
    email: "sortsuper@timps.com"
  },
  tasks: [],
  title: "First Plan",
  subdivision: "Lahore Subdivision",
  supervisor: "5c6ab1b5df7e145524e93d0e",
  sort_id: 2
}, {
  user: {
    id: "5c6ab1b5df7e145524e93d0e",
    name: "Sort Supervisor",
    email: "sortsuper@timps.com"
  },
  tasks: [],
  title: "Third Plan",
  subdivision: "Lahore Subdivision",
  supervisor: "5c6ab1b5df7e145524e93d0e",
  sort_id: 1
}, {
  user: {
    id: "5c6ab1b5df7e145524e93d0e",
    name: "Sort Supervisor",
    email: "sortsuper@timps.com"
  },
  tasks: [],
  title: "Second Plan",
  subdivision: "Lahore Subdivision",
  supervisor: "5c6ab1b5df7e145524e93d0e",
  sort_id: 3
}];

var data_01_Result = exports.data_01_Result = [{
  user: {
    id: "5c6ab1b5df7e145524e93d0e",
    name: "Sort Supervisor",
    email: "sortsuper@timps.com"
  },
  tasks: [],
  title: "Third Plan",
  subdivision: "Lahore Subdivision",
  supervisor: "5c6ab1b5df7e145524e93d0e",
  sort_id: 1
}, {
  user: {
    id: "5c6ab1b5df7e145524e93d0e",
    name: "Sort Supervisor",
    email: "sortsuper@timps.com"
  },
  tasks: [],
  title: "First Plan",
  subdivision: "Lahore Subdivision",
  supervisor: "5c6ab1b5df7e145524e93d0e",
  sort_id: 2
}, {
  user: {
    id: "5c6ab1b5df7e145524e93d0e",
    name: "Sort Supervisor",
    email: "sortsuper@timps.com"
  },
  tasks: [],
  title: "Second Plan",
  subdivision: "Lahore Subdivision",
  supervisor: "5c6ab1b5df7e145524e93d0e",
  sort_id: 3
}];

/* DATA 02 */

var data_02 = exports.data_02 = [].concat(data_01, [{
  user: {
    id: "5c5af3c49703408b04056dde",
    name: "Subdiv",
    email: "subdivsuper@tips.com"
  },
  tasks: [],
  title: "Test Plan 2",
  subdivision: "Albany Subdivision",
  supervisor: "5c5af3c49703408b04056dde",
  sort_id: 0
}, {
  user: {
    id: "5c5af3c49703408b04056dde",
    name: "Subdiv",
    email: "subdivsuper@tips.com"
  },
  tasks: [],
  title: "First Plan",
  subdivision: "Lahore Subdivision",
  supervisor: "5b8950f78aae6dadfc2721c5",
  sort_id: 0
}]);

var data_02_Result = exports.data_02_Result = [].concat(data_01_Result, [{
  user: {
    id: "5c5af3c49703408b04056dde",
    name: "Subdiv",
    email: "subdivsuper@tips.com"
  },
  tasks: [],
  title: "First Plan",
  subdivision: "Lahore Subdivision",
  supervisor: "5b8950f78aae6dadfc2721c5",
  sort_id: 0
}]);

var data_03 = exports.data_03 = data_02;

var data_03_Result = exports.data_03_Result = [].concat((0, _toConsumableArray3.default)(data_02_Result), [{
  user: {
    id: "5c5af3c49703408b04056dde",
    name: "Subdiv",
    email: "subdivsuper@tips.com"
  },
  tasks: [],
  title: "Test Plan 2",
  subdivision: "Albany Subdivision",
  supervisor: "5c5af3c49703408b04056dde",
  sort_id: 0
}]);