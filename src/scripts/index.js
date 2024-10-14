/* import { createCard, deleteCard, likeCard } from "./components/card.js";
 */

import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import {
  openPopup,
  closePopup,
  openImagePopup,
  handleEscClose,
} from "../components/modal.js";

console.log("Все импорты выполнены успешно");

const gallery = document.querySelector(".places__list");

//добавить карточку в галерею и вывести карточки на страницу
initialCards.forEach((card) => {
  const newCard = createCard(
    card.name,
    card.link,
    deleteCard,
    likeCard,
    openImagePopup
  );
  gallery.append(newCard);
});

//Второй спринт по JS:
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

// Слушатель - Открытие попапа для редактирования профиля
editProfileButton.addEventListener("click", function () {
  openPopup(editPopup);
});

// Слушатель - Открытие попапа для добавления новой карточки
addCardButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});

//4. Редактирование имени и информации о себе:
// Находим форму в DOM
const formElement = document.querySelector(".popup_type_edit .popup__form"); // Воспользуйтесь методом querySelector()

// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  // Закрываем попап после сохранения
  closePopup(editPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//6. Добавление карточки
// Находим форму для добавления новой карточки
const сardFormNew = document.querySelector(".popup_type_new-card .popup__form");

// Находим поля формы
const placeNameInput = сardFormNew.querySelector(
  ".popup__input_type_card-name"
);
const placeLinkInput = сardFormNew.querySelector(".popup__input_type_url");

// Обработчик отправки формы для добавления новой карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  // Создаём новую карточку
  const newCard = createCard(
    placeNameInput.value,
    placeLinkInput.value,
    deleteCard
  );

  // Добавляем новую карточку в начало списка карточек
  gallery.prepend(newCard);

  // Очищаем поля формы
  сardFormNew.reset();

  // Закрываем попап после добавления карточки
  closePopup(newCardPopup);
}

// Обработчик формы добавления новой карточки
сardFormNew.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newCard = createCard(
    placeNameInput.value,
    placeLinkInput.value,
    deleteCard,
    likeCard
  );
  gallery.prepend(newCard);

  сardFormNew.reset();
  closePopup(newCardPopup);
});
