import './index.css';
import Card from "../components/Card.js";
import Content from "../components/Content.js";
import DateBlock from "../components/DateBlock.js";

const date = new DateBlock(".date");

fetch(`/api/phrases?date=${date.updateDate()}`, {
  method: 'GET'
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((data) => {
    const content = new Content({
      data,
      cardRenderer: (cardInfo) => {
        const card = new Card(cardInfo, "#card-template");
        return card.generateCard();
      },
      containerSelector: ".content",
    });
    content.renderCards();

    const btnRandomize = document.querySelector(".btn-randomize");
    btnRandomize.addEventListener("click", () => content.randomize());
  })
  .catch((err) => console.log(err));
