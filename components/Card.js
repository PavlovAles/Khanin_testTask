export default class Card {
  static themesColors = {};

  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".list__card-title").textContent =
      this._data.theme;
    this._element.querySelector(".list__card-text").textContent =
      this._data.sourceText;
    this._element.style.backgroundColor = this._getThemeColor();
    return this._element;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".list__card")
      .cloneNode(true);
  }

  _getThemeColor() {
    const color = this._randomizeColor();
    if (!(this._data.theme in Card.themesColors)) {
      Card.themesColors[this._data.theme] = color;
    }
    return Card.themesColors[this._data.theme];
  }

  _randomizeColor() {
    let color = [
      100 + Math.floor(Math.random() * 100),
      100 + Math.floor(Math.random() * 100),
      100 + Math.floor(Math.random() * 100)
    ];
    color = `rgb(${color.join()})`;
    return color;
  }
}
