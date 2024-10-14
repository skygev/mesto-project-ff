const closeButtons = document.querySelectorAll(".popup__close");
const popup = document.querySelectorAll(".popup");
const imagePopup = document.querySelector(".popup_type_image");

// Функция для открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose); // Добавляем обработчик нажатия на клавишу Esc
}

// Функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-animated");
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose); // Удаляем обработчик нажатия на клавишу Esc
}

// Открытие попапа с изображением при клике на картинку + см. выше Слушатель в функции создания караточки из 1 спринта
function openImagePopup(imageSrc, caption) {
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = imageSrc;
  popupImage.alt = caption;
  popupCaption.textContent = caption;
  openPopup(imagePopup);
}

// Закрытие попапов по нажатию на крестик
closeButtons.forEach((button) => {
  const popup = button.closest(".popup"); // находим родительский попап
  button.addEventListener("click", () => closePopup(popup));
});

// Закрытие попапа при клике на оверлей (тёмный фон)
popup.forEach((popupElement) => {
  popupElement.addEventListener("click", function (event) {
    if (event.target === popupElement) {
      closePopup(popupElement);
    }
  });
});

// Функция для закрытия попапа при нажатии на Esc
function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export { openPopup, closePopup, openImagePopup, handleEscClose };
