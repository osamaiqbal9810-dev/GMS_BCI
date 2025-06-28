'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldFromDescription = fieldFromDescription;
function fieldFromDescription(fieldname, fstring) {
  //  var fieldname = 'Description' // 'Longitude';

  var index1 = fstring.indexOf(fieldname);

  var index21 = fstring.indexOf('<td>', index1);

  var index22 = fstring.indexOf('</td>', index21);

  var sstring = fstring.substring(index21, index22);
  var finalString = sstring.replace('<td>', '');
  //console.log(' Found string value : ' + finalString)
  return finalString;
}