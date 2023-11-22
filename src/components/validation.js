
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}`);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.classList.remove(`${errorClass}`);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

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

function hasInvalidInput(inputList) {

  return inputList.some( (inputElement) => {
    return !inputElement.validity.valid;
  } );

}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {

  if ( hasInvalidInput(inputList) ) {
    buttonElement.classList.add(`${inactiveButtonClass}`);
    buttonElement.setAttribute("disabled", "")
  }else {
    buttonElement.removeAttribute("disabled", "")
    buttonElement.classList.remove(`${inactiveButtonClass}`);
  }

}

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

export {enableValidation};