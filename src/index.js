import './pages/index.css';
import { createCard, removeCard } from'./components/card.js';
import { initialCards } from './components/cards.js';

// @todo: DOM узлы

const cardContainer = document.querySelector('.places__list');

// ==========================================  Вывести карточки на страницу  =================================================

initialCards.forEach( (element) => {
  cardContainer.prepend(createCard(element, removeCard));
})

// ==========================================  modal.js  =======================================================

const editButton = document.querySelector('.profile__edit-button');
const editModal = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const addModal = document.querySelector('.popup_type_new-card');

const imageModal = document.querySelector('.popup_type_image');

const deleteButtonX = document.querySelectorAll('.popup__close');

// Открытия Модального окна

function openModal(modal) {
  modal.classList.add('popup_is-opened');
}

// Закрытия Модального окна

function closeModal(modal) { 
  modal.classList.remove('popup_is-opened');
}

// Закрытия Модального окна

deleteButtonX.forEach((evt) => {  
  evt.addEventListener('click', (evt) => {
    const deleteButtonX = evt.target.closest('.popup');
    closeModal(deleteButtonX);
  })  
})

// ==========================================  Окрытия Модального окна  =================================================

editButton.addEventListener('click', () => {
  openModal(editModal);
});

addButton.addEventListener('click', () => {
  openModal(addModal)
});
