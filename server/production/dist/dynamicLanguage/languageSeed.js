"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dynamicLanguageToDB = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var dynamicLanguageToDB = exports.dynamicLanguageToDB = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var ApplicationLookupsModel, listEnglish, newLanguageList, createdList, listSpanish, _newLanguageList, _createdList, listFrench, _newLanguageList2, _createdList2;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
            _context.prev = 1;
            _context.next = 4;
            return ApplicationLookupsModel.findOne({ listName: "DynamicLanguage_en" });

          case 4:
            listEnglish = _context.sent;

            if (listEnglish) {
              _context.next = 13;
              break;
            }

            newLanguageList = {
              tenantId: "ps19",
              listName: "DynamicLanguage_en",
              code: "lang-01",
              opt1: filterLangFunc("en")
            };
            _context.next = 9;
            return new ApplicationLookupsModel(newLanguageList).save();

          case 9:
            createdList = _context.sent;

            console.log("Language List Engligh Created");
            _context.next = 18;
            break;

          case 13:
            if (!(Object.keys(listEnglish.opt1).length < Object.keys(dynamicLanguage).length)) {
              _context.next = 18;
              break;
            }

            console.log('updating list english language');
            listEnglish.opt1 = filterLangFunc('en');
            _context.next = 18;
            return listEnglish.save();

          case 18:
            _context.next = 20;
            return ApplicationLookupsModel.findOne({ listName: "DynamicLanguage_es" });

          case 20:
            listSpanish = _context.sent;

            if (listSpanish) {
              _context.next = 29;
              break;
            }

            _newLanguageList = {
              tenantId: "ps19",
              listName: "DynamicLanguage_es",
              code: "lang-02",
              opt1: filterLangFunc("es")
            };
            _context.next = 25;
            return new ApplicationLookupsModel(_newLanguageList).save();

          case 25:
            _createdList = _context.sent;

            console.log("Language List Spanish Created");
            _context.next = 34;
            break;

          case 29:
            if (!(Object.keys(listSpanish.opt1).length < Object.keys(dynamicLanguage).length)) {
              _context.next = 34;
              break;
            }

            console.log('updating list Spanish language');
            listSpanish.opt1 = filterLangFunc('es');
            _context.next = 34;
            return listSpanish.save();

          case 34:
            _context.next = 36;
            return ApplicationLookupsModel.findOne({ listName: "DynamicLanguage_fr" });

          case 36:
            listFrench = _context.sent;

            if (listFrench) {
              _context.next = 45;
              break;
            }

            _newLanguageList2 = {
              tenantId: "ps19",
              listName: "DynamicLanguage_fr",
              code: "lang-03",
              opt1: filterLangFunc("fr")
            };
            _context.next = 41;
            return new ApplicationLookupsModel(_newLanguageList2).save();

          case 41:
            _createdList2 = _context.sent;

            console.log("Language List French Created");
            _context.next = 50;
            break;

          case 45:
            if (!(Object.keys(listFrench.opt1).length < Object.keys(dynamicLanguage).length)) {
              _context.next = 50;
              break;
            }

            console.log('updating list French language');
            listFrench.opt1 = filterLangFunc('fr');
            _context.next = 50;
            return listFrench.save();

          case 50:
            _context.next = 55;
            break;

          case 52:
            _context.prev = 52;
            _context.t0 = _context["catch"](1);

            console.log("languageSeed :", _context.t0);

          case 55:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 52]]);
  }));

  return function dynamicLanguageToDB() {
    return _ref.apply(this, arguments);
  };
}();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../framework/servicelocator");


var dynamicLanguage = {
  rail: { en: "Rail", es: "Carril", fr: 'Rail' },
  "3rd Rail": { en: "3rd Rail", es: "3er carril", fr: '3e rail' },
  switch: { en: "Switch", es: "cambiar", fr: 'Commutateur' },
  ties: { en: "Ties", es: "Corbatas", fr: 'Liens' },
  line: { en: "Line", es: "Línea", fr: 'Ligne' },
  track: { en: "Track", es: "Pista", fr: 'Piste' },
  Station: { en: "Station", es: "Estación", fr: 'Station' },
  trackType: { en: "Track Type", es: "tipo de pista ", fr: 'Type de piste' },
  section: { en: "Section", es: "sección", fr: 'Section' },
  heMethod: { en: "heMethod", es: "heMethod", fr: 'heMethod' }, // SPANISH OR NOT OT BE SPANISH
  switchType: { en: "Switch Type", es: "Switch Type", fr: 'Type de commutateur' }, // SPANISH OR NOT OT BE SPANISH
  switchingMethod: { en: "Switching Method", es: "Switching Method", fr: 'Méthode de commutation' }, // SPANISH OR NOT OT BE SPANISH
  subsection: { en: "Subsection", es: "Subsection", fr: 'Sous-section' }, // SPANISH OR NOT OT BE SPANISH
  interlocking: { en: "Interlocking", es: "Enclavamiento", fr: 'Verrouillage' },
  bridge: { en: "Bridge", es: "Puente", fr: 'Pont' },
  Bridge: { en: "Bridge", es: "Puente", fr: 'Pont' },
  crossing: { en: "Crossing", es: "Cruce", fr: 'Traversée' },
  yard: { en: "Yard", es: "Yarda", fr: 'Cour' },
  derail: { en: "Derail", es: "Hacer descarrilar", fr: 'Dérailler' },
  intermediate: { en: "Intermediate", es: "Intermedio", fr: 'Intermédiaire' },
  "Dragging equipment detector": { en: "Dragging equipment detector", es: "Detector de equipos de arrastre", fr: "Détecteur d'équipement traînant" },
  "Wheel impact load detector": { en: "Wheel impact load detector", es: "Detector de carga de impacto de rueda", fr: "Détecteur de charge d'impact de roue" },
  Repeater: { en: "Repeater", es: "Reloj de repetición", fr: 'Repeater' },
  "Weather Station": { en: "Weather Station", es: "Estación meteorológica", fr: 'Station météo' },
  "Accoustic bearing detector": { en: "Accoustic bearing detector", es: "Detector de cojinetes acústicos", fr: 'Détecteur de palier acoustique' },
  "Wheel profile": { en: "Wheel profile", es: "Perfil de rueda", fr: 'Profil de roue' },
  "T-bogie/ bogies geometry": { en: "T-bogie/ bogies geometry", es: "Geometría T-bogie", fr: 'Géométrie des bogies en T' },
  "Land slide detector": { en: "Land slide detector", es: "Detector de deslizamientos de tierra", fr: 'Détecteur de glissement de terrain' },
  "Control Point": { en: "Control Point", es: "Punto de control", fr: 'Point de contrôle' },
  "Signal": { en: "Signal", es: "Señal", fr: 'Signal' },
  "Sub-Division": { en: "Sub-Division", es: "Subdivisión", fr: 'Subdivision' },
  "Interlocking": { en: "Interlocking", es: "Enclavamiento", fr: 'Verrouillage' }

};

function filterLangFunc(keyToAdd) {
  var updatedLang = _lodash2.default.cloneDeep(dynamicLanguage);
  var result = {};
  var enKeys = Object.keys(updatedLang);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = enKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      result = (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, key, (0, _defineProperty3.default)({}, keyToAdd, updatedLang[key][keyToAdd])));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}