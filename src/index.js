
import './pages/index.css';
import {initialCards} from './components/cards.js';

// @todo: Темплейт карточки

const templateCard = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardStorage, removeCard) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonRemove = card.querySelector('.card__delete-button');

  cardImg.src = cardStorage.link;
  cardTitle.textContent = cardImg.alt = cardStorage.name;

  buttonRemove.addEventListener('click', removeCard);
  
  return card;
}

// @todo: Функция удаления карточки

function removeCard(event) {
  const deleteTarget = event.target.closest('.card');
  deleteTarget.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach( (element) => {
  cardContainer.append(createCard(element, removeCard));
})