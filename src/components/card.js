//card
const template = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(name, link, deleteCard, likeCard, openImagePopup) {
  const card = template.cloneNode(true);
  const cardImage = card.querySelector(".card__image");

  card.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // открытие попапа при клике на изображение карточки из 2-го спринта по js
  cardImage.addEventListener("click", function () {
    openImagePopup(link, name);
  });

  // Слушатель - Удаление карточки
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  // Слушатель - Лайк карточки
  card.querySelector(".card__like-button").addEventListener("click", likeCard);

  return card;
}

// Функция для удаления карточки
function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

// Функция для лайка карточки
function likeCard(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
