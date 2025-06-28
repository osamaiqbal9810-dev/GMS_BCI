export default class DateTimeService {
  constructor() {
    this.nowTime = null;
  }
  getNowTime() {
    let tToReturn = null;
    if (this.nowTime) {
      tToReturn = this.nowTime;
      this.nowTime = null;
    } else {
      tToReturn = Date.now();
    }
    return tToReturn;
  }
  setNowTime(t) {
    this.nowTime = t;
  }
}
