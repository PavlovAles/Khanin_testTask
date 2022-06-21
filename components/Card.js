export default class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.list__card-title').textContent = this._data.theme;
    this._element.querySelector('.list__card-text').textContent = this._data.sourceText;
    this._element.style.backgroundColor = `rgb(${this._randomizeColor()})`
    return this._element;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".list__card")
      .cloneNode(true);
    }

  _randomizeColor(){
    const codes = [102, 204];
    const color = [0,0,0];
    color[Math.floor(Math.random() * 2)] = 102;
    color[Math.floor(Math.random() * 2)] = 204;
    console.log(color)
    return color.join();
  }
}
