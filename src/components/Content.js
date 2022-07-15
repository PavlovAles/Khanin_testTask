export default class Content {
  constructor( {cardRenderer, containerSelector} ) {
    this._renderer = cardRenderer;
    this._container = document.querySelector(containerSelector);
    this._lists = Array.from(this._container.children);

    this._errorMessage = document.createElement('p');
    this._errorMessage.style.whiteSpace = 'pre';
    this._errorMessage.textContent = 'No phrases for today :( \r\nChoose another date';
  }

  renderCards() {
    this._shuffleData();
    let arrayOfCardsData = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        arrayOfCardsData.push(this._cards[i * 5 + j]);
      }
      this._sortArrayByLength(arrayOfCardsData);
      arrayOfCardsData.forEach((item) => {
        const card = this._renderer(item);
        this._lists[i].append(card);
      });
      arrayOfCardsData = [];
    }
  }

  setCards(cards) {
    this._eraseLists();
    this._cards = cards;
  }

  eraseCards() {
    this._eraseLists();
    this._lists[0].appendChild(this._errorMessage)
  }

  _eraseLists() {
    this._lists.forEach(list => list.innerHTML = '');
  }

  _shuffleData() {
    let currenIndex = this._cards.length;
    let randomIndex;

    while (currenIndex) {
      randomIndex = Math.floor(Math.random() * currenIndex);
      currenIndex--;
      [this._cards[currenIndex], this._cards[randomIndex]] = [
        this._cards[randomIndex],
        this._cards[currenIndex],
      ];
    }
  }

  _sortArrayByLength(arr) {
    return arr.sort((a, b) => a.sourceText.length - b.sourceText.length);
  }
}
