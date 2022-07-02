export default class DateBlock {
  constructor(dateBlockSelector) {
    this._dateBlock = document.querySelector(dateBlockSelector);
    this._day = this._dateBlock.querySelector(".date__day");
    this._month = this._dateBlock.querySelector(".date__month");
  }

  updateDate() {
    this._date = new Date();
    this._day.textContent = this._date.getDate();
    this._month.textContent = this._date.toLocaleString("en", { month: "short" });
  }
}
