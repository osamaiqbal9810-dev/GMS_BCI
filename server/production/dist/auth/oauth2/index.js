"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require("express").Router();
var Joi = require("joi");
var config = require("../../config/environment/index");
// var lastRequestQuery = {};

var authorizeValidation = function authorizeValidation(data) {
  var schema = Joi.object({
    client_id: Joi.string().min(6).required(),
    redirect_uri: Joi.string().min(6).uri().required(),
    response_type: Joi.string().min(4).required(),
    state: Joi.string().required()
  });

  return schema.validate(data);
};
// We will implement authorization grant code for oauth2.0 flow

// requesting authorization
/**
 * The Alexa app displays a login page within the app, using the authorization URI you provide when you configure account linking. This login page lets the user authenticate with the authorization server.

When the Alexa app calls the specified authorization URI, it includes state, client_id, response_type, scope, and redirect_uri as query string parameters.
 */

// store following somewhere safe
// var lastRequestQuery = {};

var authorize = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var _authorizeValidation, error, url, uriWithParams;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("authorize");

            // validate the incoming uri with all the query strings
            _authorizeValidation = authorizeValidation(req.query), error = _authorizeValidation.error;

            if (!error) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).send(error.details[0].message));

          case 4:

            // query string parameters: state, client_id, response_type, scope, and redirect_uri
            /**
             * state must be required
             * client id must be requird and match with my local client id
             * response type is required and token
             * redirect uri must be valid and required
             */
            console.log("query: ", JSON.stringify(req.query));

            if (!(req.query.client_id != config.client_id)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).send("Invalid Client Id"));

          case 9:
            if (!(req.query.response_type != "token")) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).send("Invalid Response Type"));

          case 11:

            // query parameters are valid

            //   lastRequestQuery = req.query;
            //   // res.status(200).send(req.query);
            //   console.log("query: ", JSON.stringify(lastRequestQuery));

            url = config.server_comm_protocol + "://" + req.get('Host') + "/oauth2/";
            //let url = "https://rmsportal.eastus.cloudapp.azure.com/oauth2/"

            uriWithParams = new URL(url);

            uriWithParams.searchParams.append("redirect_uri", req.query.redirect_uri);
            uriWithParams.searchParams.append("state", req.query.state);

            console.log(uriWithParams.href);

            res.redirect(uriWithParams);

            // res.header({state: req.query.state}).render("login", {
            //     layout: 'login'
            // })
            return _context.abrupt("return");

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function authorize(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// router.get("/login", async (req, res) => {
//   console.log("oauth2/login");
//   console.log(req.query);
//   // validate if user has entered valid information
//   const { error } = loginValidation(req.query);
//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }

//   // check if email already exists
//   const user = await User.findOne({ email: req.query.email });
//   if (!user) {
//     return res.status(400).send("user not found");
//   }

//   const validPass = await bcrypt.compare(req.query.password, user.password);
//   if (!validPass) {
//     return res.status(400).send("invalid password");
//   }

//   // generate an access token
//   const access_token = jwt.sign({ /*Pass anything here to which we want to assign*/ _id: user._id }, process.env.TOKEN_SECRET);
//   // res.header('auth-token', token).send(token)

//   console.log("Issuing access token %s", access_token);
//   // var token_response = {
//   //     access_token: access_token,     // copy the token which has already been in use by the user
//   //     token_type: 'token',            // implicit grant type
//   //     state: lastRequestQuery.state          // save this state
//   // };

//   console.log("query: ", JSON.stringify(lastRequestQuery));
//   const uriWithParams = new URL(lastRequestQuery.redirect_uri);
//   uriWithParams.searchParams.append("access_token", access_token);
//   uriWithParams.searchParams.append("token_type", "token");
//   uriWithParams.searchParams.append("state", lastRequestQuery.state);
//   // uriWithParams.searchParams.append("name", user.name);

//   console.log(uriWithParams.href);

//   res.redirect(uriWithParams);
// });

router.get("/", authorize);
module.exports = router;