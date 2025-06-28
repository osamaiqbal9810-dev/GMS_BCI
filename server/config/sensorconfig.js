export const temperature = { min: -7, max: 7 }; // temperature limits
export const humidity = { min: 20, max: 70 }; // humidity limits
export const timeLimit = { hour: 25, min: 0, sec: 0 }; // for clean summary data
// sensor states
export const sensorstate = {
  active: 0,
  warning: 0,
  alert: 0,
  defrost: 0,
  offline: 0,
  comFailure: 0,
};
export const sensordata = {
  temperature: 0,
  humidity: 0,
};
//defrost start and end time
export const deforstTime = [{ startTime: "2021-02-25 18:00:00", endTime: "2021-02-25 18:30:00" }];
//  set initial criteria of alert state and offline state
export const stateCriteria = {
  toAlertSeconds: 600, //seconds
  toNetworkFailure: 900, //seconds
};
export const countbeforeWarning = 3;
