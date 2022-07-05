import flatpickr from "flatpickr";
import "flatpickr/dist/themes/light.css";

export default class DateBlock {
  constructor(dateBlockSelector) {
    this._dateBlock = document.querySelector(dateBlockSelector);
    this._day = this._dateBlock.querySelector(".date__day");
    this._month = this._dateBlock.querySelector(".date__month");

    this._flatpickr = flatpickr(this._dateBlock, {});
    this._flatpickr.setDate(new Date());

    this._setListener();
  }

  updateDate() {
    const date = new Date(this._flatpickr.selectedDates[0]);

    this._day.textContent = date.getDate();
    this._month.textContent = date.toLocaleString("en", { month: "short" });

    return +date;
  }

  _setListener() {
    this._dateBlock.addEventListener("change", () => this.updateDate());
  }
}
