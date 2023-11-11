// @todo: Темплейт карточки

const templateCard = document.querySelector('#card-template').content;

// ============================================  Функция создания карточки  ============================================= <

function createCard(cardStorage, removeCard, handleButtonLike, handleImgPopup) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardButtonRemove = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');


  cardImg.src = cardStorage.link;
  cardTitle.textContent = cardImg.alt = cardStorage.name;

  cardButtonRemove.addEventListener('click', removeCard); // Удаление карточки
  cardLikeButton.addEventListener('click', handleButtonLike); // Обработчик LIKE
  cardImg.addEventListener('click', handleImgPopup); // Обработчик Img для попапа

  return card;
}

// ============================================  Функция удаления карточки  ============================================= <

function removeCard(event) {
  const deleteTarget = event.target.closest('.card');
  deleteTarget.remove();
}

// Функция добавлениея/удаления Like

function handleButtonLike(evt) {
  if(evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')
  }
}

export {createCard, removeCard, handleButtonLike};