import "./index.css";
import Card from "../components/Card.js";
import Content from "../components/Content.js";
import DateBlock from "../components/DateBlock.js";

const content = new Content({
  cardRenderer: (cardInfo) => {
    const card = new Card(cardInfo, "#card-template");
    return card.generateCard();
  },
  containerSelector: ".content",
});

const date = new DateBlock({
  dateBlockSelector: ".date",
  updateHandler: () => {
    fetch(`/api/phrases?date=${date.updateDate()}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((cards) => {
        content.setCards(cards);
        content.renderCards();
      })
      .catch((err) => {
        console.log(err);
        content.eraseCards()
      });
  }
});

date.updateHandler()

