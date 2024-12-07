// Импорт стилей
import "../pages/index.css";

// Импорты компонентов
import { createCard } from "../components/card.js";
import {
  openPopup,
  closePopup,
  addCloseButtonListeners,
  addOverlayClickListeners,
} from "../components/modal.js";
import { enableValidation } from "../components/validation.js";
import {
  getProfile,
  getCards,
  updateProfileOnServer,
  addCard,
  deleteCardFromServer,
  likeCardOnServer,
  unlikeCardOnServer,
  updateAvatarOnServer,
} from "../components/api.js";

console.log("Все импорты выполнены успешно");

// --- Константы ---
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const gallery = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Попапы
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const profileAvatarContainer = document.querySelector(
  ".profile__image-container"
);

// Формы
const editProfileForm = document.querySelector(".popup_type_edit .popup__form");
const addCardForm = document.querySelector(".popup_type_new-card .popup__form");
const avatarForm = document.querySelector(".popup_type_avatar .popup__form");

// Поля ввода
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const placeNameInput = addCardForm.querySelector(
  ".popup__input_type_card-name"
);
const placeLinkInput = addCardForm.querySelector(".popup__input_type_url");
const avatarInput = avatarPopup.querySelector("#avatar-input");

// Кнопки
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// --- Функции ---

function handleLikeCard(event, cardId) {
  const likeButton = event.target;
  const likesCounter = likeButton
    .closest(".card")
    .querySelector(".card__likes-counter");

  if (likeButton.classList.contains("card__like-button_is-active")) {
    // Снятие лайка
    unlikeCardOnServer(cardId)
      .then((card) => {
        likesCounter.textContent = card.likes.length;
        likesCounter.style.display = card.likes.length > 0 ? "" : "none"; // Управляем видимостью
        if (card.likes.length > 0) {
          likeButton.classList.add("card__like-button_is-active");
        } else {
          likeButton.classList.remove("card__like-button_is-active");
        }
      })
      .catch((error) => {
        console.error("Ошибка при снятии лайка:", error);
      });
  } else {
    // Установка лайка
    likeCardOnServer(cardId)
      .then((card) => {
        likeButton.classList.add("card__like-button_is-active");
        likesCounter.textContent = card.likes.length;
      })
      .catch((error) => {
        console.error("Ошибка при постановке лайка:", error);
      });
  }
}

// Рендеринг карточек
function renderCards(cards, userId) {
  cards.forEach((card) => {
    const isLikedByUser = card.likes.some((like) => like._id === userId); // Проверяем, лайкнул ли пользователь

    const newCard = createCard(
      card.name,
      card.link,
      card.likes.length, // Количество лайков
      card._id,
      isLikedByUser, // Передаем статус лайка
      (cardId) => handleDeleteCard(cardId, newCard), // Передаем саму карточку для удаления
      (event) => handleLikeCard(event, card._id), // Функция лайка
      openImagePopup // Функция открытия попапа
    );

    // Удаляем кнопку удаления, если карточка не принадлежит текущему пользователю
    if (card.owner._id !== userId) {
      newCard.querySelector(".card__delete-button").remove();
    }

    gallery.append(newCard); // Добавляем карточку в галерею
  });
}

// Обновление профиля
function updateProfile(data) {
  profileName.textContent = data.name;
  profileJob.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
}

// Загрузка данных профиля и карточек
function loadData() {
  Promise.all([getProfile(), getCards()])
    .then(([userData, cards]) => {
      updateProfile(userData);
      renderCards(cards, userData._id);
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
}

// Обработчик формы редактирования аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const saveButton = evt.target.querySelector(".popup__button"); // Находим кнопку
  toggleButtonText(saveButton, true); // Меняем текст кнопки на "Сохранение..."

  const avatarUrl = avatarInput.value;

  updateAvatarOnServer(avatarUrl)
    .then((data) => {
      // Обновляем фон аватара
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;

      // Закрываем попап и сбрасываем форму
      closePopup(avatarPopup);
      avatarForm.reset();
    })
    .catch((error) => {
      console.error("Ошибка обновления аватара:", error);
    });
}

// Сабмит формы редактирования профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const saveButton = evt.target.querySelector(".popup__button"); // Находим кнопку
  toggleButtonText(saveButton, true); // Меняем текст кнопки на "Сохранение..."

  const name = nameInput.value;
  const about = jobInput.value;

  updateProfileOnServer(name, about)
    .then((data) => {
      updateProfile(data);
      closePopup(editPopup);
    })
    .catch((error) => console.error("Ошибка обновления профиля:", error));
}

// Сабмит формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const saveButton = evt.target.querySelector(".popup__button"); // Находим кнопку
  toggleButtonText(saveButton, true); // Меняем текст кнопки на "Сохранение..."

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  addCard(name, link)
    .then((cardData) => {
      const newCard = createCard(
        cardData.name,
        cardData.link,
        cardData.likes.length,
        cardData._id,
        false,
        () => handleDeleteCard(cardData._id),
        (event) => handleLikeCard(event, cardData._id),
        openImagePopup
      );
      gallery.prepend(newCard);
      addCardForm.reset();
      closePopup(newCardPopup);
    })
    .catch((error) => console.error("Ошибка добавления карточки:", error));
}

// Удаление карточки
function handleDeleteCard(cardId, card) {
  deleteCardFromServer(cardId) // Запрос на удаление карточки с сервера
    .then(() => {
      // Если запрос успешен, удаляем карточку из DOM
      card.remove();
    })
    .catch((error) => {
      console.error("Ошибка удаления карточки с сервера:", error);
      // Здесь можно показать сообщение об ошибке пользователю
    });
}

// Открытие попапа с изображением
function openImagePopup(imageSrc, caption) {
  popupImage.src = imageSrc;
  popupImage.alt = caption;
  popupCaption.textContent = caption;
  openPopup(imagePopup);
}

// Функция для смены текста кнопки на "Сохранение..." и обратно
function toggleButtonText(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение..."; // Меняем текст на время загрузки
    button.disabled = true; // Делаем кнопку неактивной
  } else {
    button.textContent = "Сохранить"; // Восстанавливаем исходный текст
    button.disabled = false; // Включаем кнопку снова
  }
}

// --- Слушатели ---
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

// Слушатель на контейнер аватара (обрабатывает клик на аватар и иконку)
profileAvatarContainer.addEventListener("click", () => {
  avatarForm.reset(); // Сбрасываем форму перед открытием
  openPopup(avatarPopup);
});

// Слушатель отправки формы редактирования аватара
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  openPopup(newCardPopup);
});

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

addCloseButtonListeners();
addOverlayClickListeners();

// Валидация форм
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// Загрузка данных при старте
loadData();
