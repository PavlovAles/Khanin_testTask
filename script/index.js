import Card from "../components/Card.js";
import Content from "../components/Content.js";
import DateBlock from "../components/DateBlock.js";

const date = new DateBlock(".date");
date.updateDate()

fetch("./phrases.json")
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
  })
  .catch((err) => console.log(err));
