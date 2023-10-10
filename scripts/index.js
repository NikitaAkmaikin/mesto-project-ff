// @todo: Темплейт карточки

const templateCard = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardContainer = document.querySelector('.places__list')

// @todo: Функция создания карточки

function addCard(cardStorage, cardRemove) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonRemove = card.querySelector('.card__delete-button');

  cardImg.src = cardStorage.link;
  cardImg.alt = cardStorage.name;
  cardTitle.textContent = cardStorage.name;

  buttonRemove.addEventListener('click', cardRemove);
  
  return card;
}

// @todo: Функция удаления карточки

function cardRemove(e) {
  const deleteTarget = e.target.closest('.card');
  deleteTarget.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach( (el) => {
  cardContainer.append(addCard(el, cardRemove))
})