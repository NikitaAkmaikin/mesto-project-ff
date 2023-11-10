// @todo: Темплейт карточки

const templateCard = document.querySelector('#card-template').content;

// ============================================  Функция создания карточки  ============================================= <

function createCard(cardStorage, removeCard, handleImgPopup) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonRemove = card.querySelector('.card__delete-button');

  cardImg.src = cardStorage.link;
  cardTitle.textContent = cardImg.alt = cardStorage.name;

  buttonRemove.addEventListener('click', removeCard); // Удаление карточки
  card.addEventListener('click', handleButtonLike); // Обработчик LIKE
  cardImg.addEventListener('click', handleImgPopup); // Обработчик Img для попапа

  return card;
}

// Функция добавлениея/удаления Like

function handleButtonLike(evt) {
  if(evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')
  }
}

// ============================================  Функция удаления карточки  ============================================= <

function removeCard(event) {
  const deleteTarget = event.target.closest('.card');
  deleteTarget.remove();
}

export {createCard, removeCard};