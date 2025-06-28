"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Track = require("./track.model");
//import WorkplanTemplateCreatorService from "../../service/WPTService.js";
var ServiceLocator = require("../../../framework/servicelocator");
//import ValidationUtils from "../../utilities/ValidationUtils";
exports.all = function (req, res, next) {
  Track.find({ isRemoved: false }).exec(function (err, tracks) {
    var filteredTracks = [];
    var adminCheck = req.user.isAdmin;
    var subdivisionUser = req.user.subdivision;
    if (!adminCheck && subdivisionUser) {
      tracks.forEach(function (track) {
        if (subdivisionUser == track.subdivision) {
          filteredTracks.push(track);
        }
      });
    } else {
      filteredTracks = tracks;
    }
    if (err) {
      return handleError(res, err);
    }
    res.status(200);
    res.json(filteredTracks);
  });
};

exports.find = function (req, res, next) {
  Track.findOne({ _id: req.params.id }).exec(function (err, track) {
    if (err) {
      return handleError(res, err);
    }
    res.status(200);
    res.json(track);
  });
};

exports.create = function (req, res, next) {
  var newTrack = new Track(req.body.track);
  newTrack.save(function (err, track) {
    if (err) return handleError(res, err);
    res.status(200);
    return res.json(track);
  });
};
exports.update = function (req, res, next) {
  Track.findOne({ _id: req.params.id }).exec(function (err, track) {
    if (err) {
      return handleError(res, err);
    }
    track.title = req.body.title;
    track.start = req.body.start;
    track.end = req.body.end;
    track.length = req.body.length;
    track.trackType = req.body.trackType;
    track.trafficType = req.body.trafficType;
    track.weight = req.body.weight;
    track.class = req.body.class;
    track.units = req.body.units;
    track.save(function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, track) {
        var workPlanTemplateService, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", next(err));

              case 2:
                if (!track.templateCreated) {
                  _context.next = 16;
                  break;
                }

                workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
                _context.next = 6;
                return workPlanTemplateService.updateTemplateOnAssetGroupUpdate(track);

              case 6:
                result = _context.sent;

                if (!(result.status == 200)) {
                  _context.next = 12;
                  break;
                }

                res.status(200);
                return _context.abrupt("return", res.json(track));

              case 12:
                res.status(500);
                return _context.abrupt("return", res.send("Workplan Not Updated"));

              case 14:
                _context.next = 18;
                break;

              case 16:
                res.status(200);
                return _context.abrupt("return", res.json(track));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  });
};
exports.delete = function (req, res, next) {
  Track.findOne({ _id: req.params.id }, function (err, track) {
    if (err) {
      return handleError(res, err);
    }
    if (!track) {
      res.status(404);
      return res.json("Track Not Found");
    }
    track.isRemoved = true;
    track.save(function (err, track) {
      if (err) {
        return next(err);
      }
      res.status(200);
      return res.json(track);
    });
  });
};

exports.createTemplate = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var WorkplanTemplateService, AssetGroupModel, template, assetGroup, workPlanModel, newTemplate, saved, savedAssetGroup;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            WorkplanTemplateService = ServiceLocator.resolve("WorkplanTemplateService");
            AssetGroupModel = ServiceLocator.resolve("TrackModel");
            _context2.next = 4;
            return WorkplanTemplateService.buildWorkplanTemplate(req.body, req.user);

          case 4:
            template = _context2.sent;
            _context2.prev = 5;
            _context2.next = 8;
            return AssetGroupModel.findById(req.body._id).exec();

          case 8:
            assetGroup = _context2.sent;

            if (!(template && !assetGroup.templateCreated)) {
              _context2.next = 38;
              break;
            }

            workPlanModel = ServiceLocator.resolve("WorkPlanTemplateModel");
            newTemplate = new workPlanModel(template);
            _context2.prev = 12;

            newTemplate.nextInspectionDate = new Date();
            newTemplate.nextInspectionDate.setDate(newTemplate.nextInspectionDate.getDate() + newTemplate.inspectionFrequency);
            _context2.next = 17;
            return newTemplate.save();

          case 17:
            saved = _context2.sent;
            _context2.prev = 18;

            //let updateAssetGroup = await AssetGroupModel.findByIdAndUpdate(req.body._id, { $set: { templateCreated: newTemplate.id } });
            assetGroup.templateCreated = newTemplate.id;
            _context2.next = 22;
            return assetGroup.save();

          case 22:
            savedAssetGroup = _context2.sent;

            res.status(202);
            res.json(savedAssetGroup);
            _context2.next = 31;
            break;

          case 27:
            _context2.prev = 27;
            _context2.t0 = _context2["catch"](18);

            console.log(_context2.t0);
            handleError(res, _context2.t0);

          case 31:
            _context2.next = 36;
            break;

          case 33:
            _context2.prev = 33;
            _context2.t1 = _context2["catch"](12);

            handleError(res, _context2.t1);

          case 36:
            _context2.next = 40;
            break;

          case 38:
            res.status(404);
            res.send("Can Not Create Workplan from given AssetGroup");

          case 40:
            _context2.next = 47;
            break;

          case 42:
            _context2.prev = 42;
            _context2.t2 = _context2["catch"](5);

            res.status(404);
            console.log(_context2.t2);
            res.send("Can Not Find AssetGroup");

          case 47:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[5, 42], [12, 33], [18, 27]]);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

function handleError(res, err) {
  res.status(500);
  return res.send(err);
}