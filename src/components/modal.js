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
  // Сброс состояния кнопки при закрытии попапа
  const saveButton = popup.querySelector(".popup__button"); // Находим кнопку в текущем попапе
  if (saveButton) {
    saveButton.disabled = true; // Делаем кнопку неактивной
    saveButton.classList.add("popup__button_disabled"); // Добавляем класс для неактивной кнопки
  }
}

// Закрытие попапов по нажатию на крестик
function addCloseButtonListeners() {
  const closeButtons = document.querySelectorAll(".popup__close");
  closeButtons.forEach((button) => {
    const popupElement = button.closest(".popup"); // находим родительский попап
    button.addEventListener("click", () => closePopup(popupElement));
  });
}

// Закрытие попапа при клике на оверлей (тёмный фон)
function addOverlayClickListeners() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popupElement) => {
    popupElement.addEventListener("click", function (event) {
      if (event.target === popupElement) {
        closePopup(popupElement);
      }
    });
  });
}

// Функция для закрытия попапа при нажатии на Esc
function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export {
  openPopup,
  closePopup,
  handleEscClose,
  addCloseButtonListeners,
  addOverlayClickListeners,
};
