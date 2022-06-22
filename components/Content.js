export default class Content {
  constructor( {data, cardRenderer, containerSelector} ) {
    this._data = data;
    this._renderer = cardRenderer;
    this._container = document.querySelector(containerSelector);
    this._lists = Array.from(this._container.children);
  }

  renderCards() {
    this._shuffleData();
    let arrayOfCardsData = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        arrayOfCardsData.push(this._data[i * 5 + j]);
      }
      this._sortArrayByLength(arrayOfCardsData);
      arrayOfCardsData.forEach((item) => {
        const card = this._renderer(item);
        this._lists[i].append(card);
      });
      arrayOfCardsData = [];
    }
  }

  randomize() {
    this._lists.forEach(list => list.innerHTML = '')
    this.renderCards();
  }

  setItem(item) {
    this._container.prepend(item);
  }

  _shuffleData() {
    let currenIndex = this._data.length;
    let randomIndex;

    while (currenIndex) {
      randomIndex = Math.floor(Math.random() * currenIndex);
      currenIndex--;
      [this._data[currenIndex], this._data[randomIndex]] = [
        this._data[randomIndex],
        this._data[currenIndex],
      ];
    }
  }

  _sortArrayByLength(arr) {
    return arr.sort((a, b) => a.sourceText.length - b.sourceText.length);
  }
}
