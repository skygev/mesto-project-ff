const template = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(
  name,
  link,
  likesCount,
  cardId,
  isLikedByUser,
  handleDeleteCard,
  likeCard,
  openImagePopup
) {
  const card = template.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const likesCounter = card.querySelector(".card__likes-counter");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  // Устанавливаем данные карточки
  card.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Устанавливаем количество лайков и видимость счетчика
  if (likesCount > 0) {
    likesCounter.textContent = likesCount;
    likesCounter.style.display = ""; // Показываем счетчик
  } else {
    likesCounter.style.display = "none"; // Скрываем счетчик
  }

  // Устанавливаем состояние кнопки лайка
  if (isLikedByUser) {
    likeButton.classList.add("card__like-button_is-active"); // Активное сердечко
  } else {
    likeButton.classList.remove("card__like-button_is-active"); // Неактивное сердечко
  }

  // Открытие попапа при клике на изображение
  cardImage.addEventListener("click", () => {
    openImagePopup(link, name);
  });

  // Удаление карточки
  if (handleDeleteCard) {
    deleteButton.addEventListener("click", () => handleDeleteCard(cardId));
  } else {
    deleteButton.remove();
  }

  // Лайк карточки
  likeButton.addEventListener("click", likeCard);

  return card;
}

export { createCard };
