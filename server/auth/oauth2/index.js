const router = require("express").Router();
const Joi = require("joi");
let config = require("../../config/environment/index");
// var lastRequestQuery = {};

const authorizeValidation = function (data) {
  const schema = Joi.object({
    client_id: Joi.string().min(6).required(),
    redirect_uri: Joi.string().min(6).uri().required(),
    response_type: Joi.string().min(4).required(),
    state: Joi.string().required(),
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

const authorize = async (req, res) => {
  console.log("authorize");

  // validate the incoming uri with all the query strings
  const { error } = authorizeValidation(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // query string parameters: state, client_id, response_type, scope, and redirect_uri
  /**
   * state must be required
   * client id must be requird and match with my local client id
   * response type is required and token
   * redirect uri must be valid and required
   */
  console.log("query: ", JSON.stringify(req.query));
  if (req.query.client_id != config.client_id) {
    return res.status(400).send("Invalid Client Id");
  } else if (req.query.response_type != "token") {
    return res.status(400).send("Invalid Response Type");
  }

  // query parameters are valid

  //   lastRequestQuery = req.query;
  //   // res.status(200).send(req.query);
  //   console.log("query: ", JSON.stringify(lastRequestQuery));

  let url = config.server_comm_protocol + "://" + req.get('Host') + "/oauth2/"
  //let url = "https://rmsportal.eastus.cloudapp.azure.com/oauth2/"
  const uriWithParams = new URL(url);
  uriWithParams.searchParams.append("redirect_uri", req.query.redirect_uri);
  uriWithParams.searchParams.append("state", req.query.state);

  console.log(uriWithParams.href);

  res.redirect(uriWithParams);

  // res.header({state: req.query.state}).render("login", {
  //     layout: 'login'
  // })
  return;
};

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
