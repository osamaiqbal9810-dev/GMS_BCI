let ServiceLocator = require("../../framework/servicelocator");


exports.loggedInUserNotifications = async function(req, res) {
    let notificationService = ServiceLocator.resolve("NotificationService");
    let resultObj = { status: 500, errorVal: "default" };
    try 
    {
      resultObj.value = await notificationService.pullNotificationForUser(req.user._id);
      resultObj.status = 200;
    } 
    catch (err) 
    {
      resultObj.status = 500;
      resultObj.errorVal = err.toString();
      console.log("Notification.controller.all.catch", err.toString());
    }
  
    res.status(resultObj.status);
    if (resultObj.value) res.json(resultObj.value);
    else res.json(resultObj.errorVal);
};

exports.ackAlerts = async function(req, res)
{
  let notificationService = ServiceLocator.resolve("NotificationService");
  let resultObj = await notificationService.findDevicesAlerts(req.params.id);

  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);

}

exports.find = async function(req, res)
{
  let notificationService = ServiceLocator.resolve("NotificationService");
  let resultObj = await notificationService.findAlerts(req.params.id);

  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);

}
exports.ackAll = async function(req, res)
{
  //console.log(req.query);

  let notificationService = ServiceLocator.resolve("NotificationService");
  let resultObj = await notificationService.acknowledgeAll(req.body);

  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  
  res.status(200);
  res.json(resultObj.value);

}

exports.createCommFailure = async function(req, res)
{
  let resultObj = { status: 500, errorVal: "default" };
  try 
  {
  let notificationService = ServiceLocator.resolve("NotificationService");
  let resultObj = await notificationService.createCommFailureNotification(req.body.id,req.body.code,req.body.description,req.body.type);
  res.status(200);
  }catch (err) 
  {
    resultObj.status = 500;
    console.log("Notification.controller.createCommFailure.catch", err.toString());
  }

}
exports.update = async function(req, res) {

    let notificationService = ServiceLocator.resolve("NotificationService");
    let resultObj = { status: 500, errorVal: "default" };
    try 
    {
      resultObj = await notificationService.updateStatus(req.body);
    } 
    catch (err) 
    {
      resultObj.status = 500;
      resultObj.errorVal = err.toString();
      console.log("Notification.controller.all.catch", err.toString());
    }
  
    res.status(resultObj.status);
    if (resultObj.value) res.json(resultObj.value);
    else res.json(resultObj.errorVal);
};

exports.delete = async function(req, res) {
  const {_id} = req.body;
  let notificationService = ServiceLocator.resolve("NotificationService");
  let resultObj = { status: 500, errorVal: "default" };
  try 
  {
    resultObj = await notificationService.delete(_id);
  } 
  catch (err) 
  {
    resultObj.status = 500;
    resultObj.errorVal = err.toString();
    console.log("Notification.controller.all.catch", err.toString());
  }

  res.status(resultObj.status);
  if (resultObj.value) res.json(resultObj);
  else res.json(resultObj.errorVal);
};
