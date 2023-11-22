// ========================================== Добавление ошибки ==========================================

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}`);
};

// ========================================== Удаление ошибки ==========================================

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.classList.remove(`${errorClass}`);
  errorElement.textContent = '';
};

// ========================================== Проверка валидности поля ==========================================

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  // Тонкая настройка текста "ошибки"
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }

};

// ========================================== Проверка валидности всех полей ==========================================

function hasInvalidInput(inputList) {

  return inputList.some( (inputElement) => {
    return !inputElement.validity.valid;
  } );

}

// ========================================== Активность/не активноесть кнопки "Сохранить" ==========================================

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {

  if ( hasInvalidInput(inputList) ) {
    buttonElement.classList.add(`${inactiveButtonClass}`);
    buttonElement.setAttribute("disabled", "")
  }else {
    buttonElement.removeAttribute("disabled", "")
    buttonElement.classList.remove(`${inactiveButtonClass}`);
  }

}

// ========================================== Валидация полей ==========================================

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass) => {

  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
  const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
  
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', function () {

      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    });

  });

};

// ========================================== Валидация Форм ==========================================

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

const enableValidation = (data) => {

  const formList = Array.from(document.querySelectorAll(`${data.formSelector}`));

  formList.forEach((formElement) => {
    
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(
      formElement,
      data.inputSelector,
      data.submitButtonSelector,
      data.inactiveButtonClass,
      data.inputErrorClass,
      data.errorClass)
  });
};

function clearValidation(formElement, data) {
  const inputList = Array.from(formElement.querySelectorAll(`${data.inputSelector}`));
  const buttonElement = formElement.querySelector(`${data.submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, data.inputErrorClass, data.errorClass)
  })

  buttonElement.classList.add(data.inactiveButtonClass);
};


export {enableValidation, clearValidation};