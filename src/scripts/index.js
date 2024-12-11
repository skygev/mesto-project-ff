// Импорт стилей
import "../pages/index.css";

// Импорты компонентов
import {
  createCard,
  handleLikeStatusChange,
  handleDeleteCard,
} from "../components/card.js";
import {
  openPopup,
  closePopup,
  addCloseButtonListeners,
  addOverlayClickListeners,
} from "../components/modal.js";
import {
  enableValidation,
  clearInputFields,
} from "../components/validation.js";
import {
  getProfile,
  getCards,
  updateProfileOnServer,
  addCard,
  updateAvatarOnServer,
} from "../components/api.js";

console.log("Все импорты выполнены успешно");

let userId; // Глобальная переменная для хранения ID пользователя

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

// Рендеринг карточек
const renderCards = (cards, userId) => {
  cards.forEach((card) => {
    const cardElement = createCard(
      card.name,
      card.link,
      card.likes,
      card._id,
      userId,
      card.owner._id, // Передаём ID владельца карточки
      handleOpenImagePopup, // Передаём функцию открытия попапа
      handleLikeStatusChange, // Передаём функцию обработки лайков
      handleDeleteCard // Передаём функцию обработки удаления карточки
    );
    gallery.append(cardElement);
  });
};

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
      userId = userData._id; // Сохраняем ID пользователя
      updateProfile(userData);
      renderCards(cards, userId);
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
}

// Функция сброса состояния кнопки
function resetButtonState(saveButton) {
  if (saveButton) {
    saveButton.disabled = true;
    saveButton.classList.add("popup__button_disabled");
  }
}

// Обработчик формы редактирования аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const saveButton = evt.target.querySelector(".popup__button");
  toggleButtonText(saveButton, true);

  const avatarUrl = avatarInput.value;

  updateAvatarOnServer(avatarUrl)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      avatarForm.reset();
      resetButtonState(saveButton); // Сброс состояния кнопки при успешной отправке
      closePopup(avatarPopup);
    })
    .catch((error) => {
      console.error("Ошибка обновления аватара:", error);
    })
    .finally(() => toggleButtonText(saveButton, false));
}

// Сабмит формы редактирования профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const saveButton = evt.target.querySelector(".popup__button");
  toggleButtonText(saveButton, true);

  const name = nameInput.value;
  const about = jobInput.value;

  updateProfileOnServer(name, about)
    .then((data) => {
      updateProfile(data);
      resetButtonState(saveButton); // Сброс состояния кнопки при успешной отправке
      closePopup(editPopup);
    })
    .catch((error) => {
      console.error("Ошибка обновления профиля:", error);
    })
    .finally(() => toggleButtonText(saveButton, false));
}

// Сабмит формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const saveButton = evt.target.querySelector(".popup__button");
  toggleButtonText(saveButton, true);

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  addCard(name, link)
    .then((cardData) => {
      const newCard = createCard(
        cardData.name,
        cardData.link,
        cardData.likes,
        cardData._id,
        userId,
        cardData.owner._id,
        handleOpenImagePopup,
        handleLikeStatusChange,
        handleDeleteCard
      );
      gallery.prepend(newCard);
      addCardForm.reset();
      resetButtonState(saveButton); // Сброс состояния кнопки при успешной отправке
      closePopup(newCardPopup);
    })
    .catch((error) => {
      console.error("Ошибка добавления карточки:", error);
    })
    .finally(() => toggleButtonText(saveButton, false));
}

// Открытие попапа с изображением
function handleOpenImagePopup(imageSrc, caption) {
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
  clearInputFields(editPopup, config); // Очистка полей ввода
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

// Слушатель на контейнер аватара (обрабатывает клик на аватар и иконку)
profileAvatarContainer.addEventListener("click", () => {
  clearInputFields(avatarPopup, config); // Очистка полей ввода
  openPopup(avatarPopup);
});

// Слушатель отправки формы редактирования аватара
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

addCardButton.addEventListener("click", () => {
  clearInputFields(newCardPopup, config); // Очистка полей ввода
  openPopup(newCardPopup);
});

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

addCloseButtonListeners();
addOverlayClickListeners();

// Конфигурация для валидации
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  errorActiveClass: "popup__input-error_active",
};

// Включение валидации
enableValidation(config);

// Загрузка данных при старте
loadData();
