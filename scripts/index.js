// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const gallery = document.querySelector(".places__list");
const template = document.querySelector("#card-template").content;

//создать карточку
function createCard(name, link) {
  const card = template.cloneNode(true);
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").src = link;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return card;
}

//добавить карточку в галерею
initialCards.forEach((card) => {
  const newCard = createCard(card.name, card.link);
  gallery.append(newCard);
});

// Функция для удаления карточки
function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}
