function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
  inputElement.classList.add("popup__input_type_error");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
}

// Функция проверки валидности через атрибут pattern и data-error-message
function checkInputValidity(formElement, inputElement) {
  // Проверяем, есть ли у элемента pattern
  if (inputElement.validity.patternMismatch) {
    // Получаем сообщение из data-error-message
    const customErrorMessage = inputElement.dataset.errorMessage;
    showInputError(formElement, inputElement, customErrorMessage);
  } else if (!inputElement.validity.valid) {
    // Для стандартных ошибок (например, пустое поле)
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если поле валидно
    hideInputError(formElement, inputElement);
  }
}

// Функция управления состоянием кнопки отправки
function toggleButtonState(inputList, buttonElement) {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );
  if (hasInvalidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup__button_disabled");
  }
}

// Установка слушателей для формы
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Функция для очистки полей ввода
function clearInputFields(popup) {
  const inputFields = popup.querySelectorAll("input"); // Получаем все поля ввода в модальном окне
  inputFields.forEach((input) => {
    input.value = ""; // Устанавливаем значение каждого поля в пустую строку
    hideInputError(popup, input); // Убираем любые ошибки ввода
  });
}

// Включение валидации для всех форм
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

export { enableValidation, clearInputFields };
