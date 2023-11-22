import './pages/index.css';
// import { initialCards } from './components/cards.js';
import { createCard, removeCard, handleButtonLike} from'./components/card.js';
import { openModal, closeModal } from'./components/modal.js';
import {enableValidation, clearValidation} from'./components/validation.js';
import {loadingInfoProfile, loadingCards, editingProfile, addServerCard} from'./components/api.js'

// ==========================================  DOM узлы  =================================================

const cardContainer = document.querySelector('.places__list');

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image');

const profileModal = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];
const profileNameInput = profileForm.elements.name;
const profileJobInput = profileForm.elements.description;

const newCardModal = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const newCardForm = document.forms['new-place'];
const newCardNameCityInput = newCardForm.elements['place-name'];
const newCardLinkImgInput = newCardForm.elements.link;

const imagePopup = document.querySelector('.popup_type_image');
const imageLink = imagePopup.querySelector('.popup__image');
const imageText = imagePopup.querySelector('.popup__caption');

const closeButtonsPopups  = document.querySelectorAll('.popup__close');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// ==========================================  Изначальный вывод карточек на страницу  =================================================

loadingCards(cardContainer, createCard, removeCard, handleButtonLike, handleImgPopup)

// Страрый код
// initialCards.forEach( (el) => {
//   cardContainer.append(createCard(el, removeCard, handleButtonLike, handleImgPopup));
// })

// Promise.all()
// .then((value) => {
  
// }).catch(err => {
//   console.log('Ошибка, сервер не отвечает')
// })

// ==========================================  Окрытия Модального окна  =================================================

profileButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(profileModal);
});

newCardButton.addEventListener('click', () => {
  clearValidation(newCardForm, validationConfig);
  openModal(newCardModal);
});

function handleImgPopup(evt) {
  imageLink.src = evt.target.src;
  imageLink.alt = imageText.textContent = evt.target.alt;
  openModal(imagePopup);
}

// ==========================================  Закрытия Модального окна  =================================================

closeButtonsPopups.forEach((closeButton) => {  
  closeButton.addEventListener('click', (el) => {
    const popup = el.target.closest('.popup');
    closeModal(popup);
  })
});

// ==========================================  Редактирование профиля  =================================================

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // profileName.textContent = profileNameInput.value;
  // profileDescription.textContent = profileJobInput.value;
  editingProfile(profileNameInput, profileJobInput);
  closeModal(profileModal);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// ==========================================  Добавление новой карточки  =================================================

function addCard(evt) {
  evt.preventDefault();

  // старый код
  // const newCardStorage = {
  //   name: newCardNameCityInput.value,
  //   link: newCardLinkImgInput.value,
  // };

  addServerCard(cardContainer, newCardNameCityInput, newCardLinkImgInput, createCard, removeCard, handleButtonLike, handleImgPopup);
  evt.target.reset() // Очищаю значение в попапе
  closeModal(newCardModal);
}

newCardForm.addEventListener('submit', addCard);

// ==========================================  Валидация профиля  =================================================

enableValidation(validationConfig);

loadingInfoProfile(profileName, profileDescription, profileImage);