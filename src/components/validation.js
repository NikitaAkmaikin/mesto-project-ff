// ========================================== Добавление ошибки ==========================================

const showInputError = (formElement, inputElement, errorMessage, data) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${data.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${data.errorClass}`);
};

// ========================================== Удаление ошибки ==========================================

const hideInputError = (formElement, inputElement, data) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${data.inputErrorClass}`);
  errorElement.classList.remove(`${data.errorClass}`);
  errorElement.textContent = '';
};

// ========================================== Проверка валидности поля ==========================================

const checkInputValidity = (formElement, inputElement, data) => {
  // Тонкая настройка текста "ошибки"
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, data);
  } else {
    hideInputError(formElement, inputElement, data);
  }

};

// ========================================== Проверка валидности всех полей ==========================================

function hasInvalidInput(inputList) {

  return inputList.some( (inputElement) => {
    return !inputElement.validity.valid;
  } );

}

// ========================================== Активность/не активноесть кнопки "Сохранить" ==========================================

function toggleButtonState(inputList, buttonElement, data) {

  if ( hasInvalidInput(inputList) ) {
    buttonElement.classList.add(`${data.inactiveButtonClass}`);
    buttonElement.setAttribute("disabled", "")
  }else {
    buttonElement.removeAttribute("disabled", "")
    buttonElement.classList.remove(`${data.inactiveButtonClass}`);
  }

}

// ========================================== Валидация полей ==========================================

const setEventListeners = ( formElement, data) => {

  const inputList = Array.from(formElement.querySelectorAll(`${data.inputSelector}`));
  const buttonElement = formElement.querySelector(`${data.submitButtonSelector}`);
  
  toggleButtonState(inputList, buttonElement, data);

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', function () {

      checkInputValidity(formElement, inputElement, data);
      toggleButtonState(inputList, buttonElement, data);

    });

  });

};

// ========================================== Валидация Форм ==========================================

const enableValidation = (data) => {

  const formList = Array.from(document.querySelectorAll(`${data.formSelector}`));

  formList.forEach((formElement) => {
    
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, data)
  });
};

function clearValidation(formElement, data) {
  const inputList = Array.from(formElement.querySelectorAll(`${data.inputSelector}`));
  const buttonElement = formElement.querySelector(`${data.submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, data)
  })

  buttonElement.classList.add(data.inactiveButtonClass);
};

export {enableValidation, clearValidation};