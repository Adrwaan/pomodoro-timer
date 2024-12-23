export default class Timer {
  seconds: number;
  minutes: number;
  studySecQtd: number;
  shortBreakQtd: number;
  longBreakQtd: number;
  private opt: "shortInterval" | "longInterval" | "studySec";

  constructor(seconds: number, minutes: number) {
    this.seconds = seconds;
    this.minutes = minutes;
    this.studySecQtd = 0;
    this.shortBreakQtd = 0;
    this.longBreakQtd = 0;
    this.opt = "studySec";
  }

  resetTimer() {
    this.minutes = 25;
    this.seconds = 0;
    this.opt = "studySec";
  }

  setShortBreakTime() {
    this.minutes = 5;
    this.seconds = 0;
    this.opt = "shortInterval";
  }

  setLongBreakTime() {
    this.minutes = 25;
    this.seconds = 0;
    this.opt = "longInterval";
  }

  decreaseOneSecond() {
    if (this.seconds === 0 && this.minutes > 0) {
      this.minutes -= 1;
      this.seconds = 59;
    } else if (this.seconds !== 0) {
      this.seconds -= 1;
    } else {
      switch (this.opt) {
        case "longInterval":
          this.longBreakQtd += 1;
          break;
        case "shortInterval":
          this.shortBreakQtd += 1;
          break;
        case "studySec":
          this.studySecQtd += 1;
          break;
      }
    }
  }
}
