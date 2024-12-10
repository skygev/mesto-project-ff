import {
  likeCardOnServer,
  unlikeCardOnServer,
  deleteCardFromServer,
} from "../components/api.js";

// Функция для создания карточки
function createCard(
  name,
  link,
  likes,
  cardId,
  userId,
  ownerId,
  handleOpenImagePopup
) {
  const template = document.querySelector("#card-template").content;
  const card = template.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const likesCounter = card.querySelector(".card__likes-counter");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  // Вычисляем, лайкнута ли карточка текущим пользователем
  const isLikedByUser = likes.some((like) => like._id === userId);

  // Устанавливаем данные карточки
  card.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Устанавливаем количество лайков и видимость счетчика
  if (likes.length > 0) {
    likesCounter.textContent = likes.length;
    likesCounter.style.display = "";
  } else {
    likesCounter.style.display = "none";
  }

  // Устанавливаем состояние кнопки лайка
  if (isLikedByUser) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Открытие попапа изображения
  cardImage.addEventListener("click", () => handleOpenImagePopup(link, name));

  // Обработчик лайков
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    const apiCall = isLiked ? unlikeCardOnServer : likeCardOnServer;

    apiCall(cardId)
      .then((updatedCard) => {
        likeButton.classList.toggle("card__like-button_is-active", !isLiked);
        likesCounter.textContent = updatedCard.likes.length;
        likesCounter.style.display = updatedCard.likes.length > 0 ? "" : "none";
      })
      .catch((err) => console.error("Ошибка лайка:", err));
  });

  // Обработчик удаления карточки
  if (userId === ownerId) {
    deleteButton.addEventListener("click", () => {
      deleteCardFromServer(cardId)
        .then(() => {
          card.remove();
        })
        .catch((err) => console.error("Ошибка удаления карточки:", err));
    });
  } else {
    deleteButton.style.display = "none"; // Скрываем кнопку удаления для чужих карточек
  }

  return card;
}

export { createCard };
