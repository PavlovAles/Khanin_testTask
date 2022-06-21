export default class Card {
  static themesColors = {};

  constructor(cardInfo, templateSelector) {
    this._cardInfo = cardInfo;
    this._templateSelector = templateSelector;
    this._trasnlated = false;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector(".list__card-title");
    this._text = this._element.querySelector(".list__card-text");

    this._title.textContent = this._cardInfo.theme;
    this._text.textContent = this._cardInfo.sourceText;
    this._element.style.backgroundColor = this._getThemeColor();

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.addEventListener("click", () => this._translate());
    this._element.addEventListener("dblclick", () => this._delete());
  }

  _translate() {
    this._trasnlated = !this._trasnlated;
    this._animateTranslation();
    if (this._trasnlated) {
      this._text.textContent = this._cardInfo.translation;
      setTimeout(() => this._revertTranslation(), 4000);
    }
    else {
      this._text.textContent = this._cardInfo.sourceText;
    }
  }

  _revertTranslation() {
    if (this._trasnlated) {
      this._text.textContent = this._cardInfo.sourceText;
      this._animateTranslation();
    }
  }

  _animateTranslation() {
    this._text.classList.add('list__card-text_animate');
    setTimeout(() => this._text.classList.remove('list__card-text_animate'), 300)
  }

  _delete() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".list__card")
      .cloneNode(true);
  }

  _getThemeColor() {
    const color = this._randomizeColor();
    if (!(this._cardInfo.theme in Card.themesColors)) {
      Card.themesColors[this._cardInfo.theme] = color;
    }
    return Card.themesColors[this._cardInfo.theme];
  }

  _randomizeColor() {
    let color = [
      100 + Math.floor(Math.random() * 100),
      100 + Math.floor(Math.random() * 100),
      100 + Math.floor(Math.random() * 100),
    ];
    color = `rgb(${color.join()})`;
    return color;
  }
}
