import Card from "../components/Card.js";

const initialData = fetch("./phrases.json")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((data) => renderCards(data))
  .catch((err) => console.log(err));

const lists = document.querySelectorAll(".list");

function renderCards(data) {
  const info = getRandomInfo(data);
  
  data.forEach((element) => {
    const card = new Card(element, "#card-template");
    lists[0].append(card.generateCard());
  });
}

function getRandomInfo(data) {
  let indexes = [];
  function getRandomIndex() {
    let randomIndex = Math.floor(Math.random() * data.length);
    if (randomIndex in indexes) getRandomIndex();
    indexes.push(randomIndex);
    return randomIndex;
  }

  const infoArray = [];
  for (let i = 0; i < 5; i++) {
    infoArray.push(data[getRandomIndex()]);
  }

  return infoArray;
}
