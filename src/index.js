import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, removeCard } from'./components/card.js';
import { openModal, closeModal } from'./components/modal.js';

// ==========================================  DOM узлы  =================================================

const cardContainer = document.querySelector('.places__list');

const editName = document.querySelector('.profile__title')
const editDescription = document.querySelector('.profile__description')

const editModal = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const editForm = document.forms['edit-profile'];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;

const newCardModal = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const newCardForm = document.forms['new-place'];
const nameCityInput = newCardForm.elements['place-name'];
const linkImgInput = newCardForm.elements.link;

const imagePopup = document.querySelector('.popup_type_image');
const imageLink = imagePopup.querySelector('.popup__image');
const imageText = imagePopup.querySelector('.popup__caption');

const deleteButtonX = document.querySelectorAll('.popup__close');

// ==========================================  Изначальный вывод карточек на страницу  =================================================

initialCards.forEach( (element) => {
  cardContainer.append(createCard(element, removeCard, buttonLike, imgPopup));
})

// Функция добавлениея/удаления Like

function buttonLike(evt) {
  if(evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')
  }
}

// ==========================================  Окрытия Модального окна  =================================================

editButton.addEventListener('click', () => {
  nameInput.value = editName.textContent;
  jobInput.value = editDescription.textContent;
  openModal(editModal);
});

newCardButton.addEventListener('click', () => {
  nameCityInput.value = linkImgInput.value = '';
  openModal(newCardModal);
});

function imgPopup(evt) {
  imageLink.src = evt.target.src;
  imageLink.alt = imageText.textContent = evt.target.alt;
  openModal(imagePopup);
}

// ==========================================  Закрытия Модального окна  =================================================

deleteButtonX.forEach((evt) => {  
  evt.addEventListener('click', (el) => {
    const ButtonX = el.target.closest('.popup');
    closeModal(ButtonX);
  })
});

// ==========================================  Редактирование профиля  =================================================

function handleFormSubmit(evt) {
  evt.preventDefault();

  editName.textContent = nameInput.value;
  editDescription.textContent = jobInput.value;
  closeModal(editModal);
}

editForm.addEventListener('submit', handleFormSubmit);

// ==========================================  Добавление новой карточки  =================================================

function addCard(evt) {
  evt.preventDefault();

  const newCardStorage = {
    name: nameCityInput.value,
    link: linkImgInput.value,
  };

  cardContainer.prepend(createCard(newCardStorage, removeCard, buttonLike, imgPopup));
  closeModal(newCardModal);
}

newCardForm.addEventListener('submit', addCard);