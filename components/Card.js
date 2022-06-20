export default class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.list__card-title').textContent = this._data.theme;
    this._element.querySelector('.list__card-text').textContent = this._data.sourceText;
    return this._element;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".list__card")
      .cloneNode(true);
  }
}
