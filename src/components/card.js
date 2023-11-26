// @todo: Темплейт карточки

const templateCard = document.querySelector('#card-template').content;

// ============================================  Функция создания карточки  ============================================= <

function createCard(cardStorage, removeCard, handleButtonLike, handleImgPopup, handleСonfirmDeletePopup, handleDeleteCard) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardRemoveButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikeCount = card.querySelector('.card__like-counter');
  const cardId = card.id = cardStorage["_id"];
  const apiId = 'cabca2f13d88c94083c8814a';

  cardImg.src = cardStorage.link;
  cardTitle.textContent = cardImg.alt = cardStorage.name;
  cardLikeCount.textContent = cardStorage.likes.length;

  if(cardStorage.owner._id !== apiId) { // удаление кнопки DELETE с чужой карточки
    cardRemoveButton.style.display = 'none';
  } 
   else {
    cardRemoveButton.addEventListener('click', () => {
      handleСonfirmDeletePopup(cardId);
  });
  }

  cardLikeButton.addEventListener('click', handleButtonLike); // Обработчик LIKE
  cardImg.addEventListener('click', handleImgPopup); // Обработчик Img для попапа

  return card;
}

// ============================================  Функция удаления карточки  ============================================= <

function removeCard(card, evt) {
  // const deleteTarget = card.target;
  // console.log(evt.target.querySelector('.popup__button'))
  // deleteTarget.remove();
}

// Функция добавлениея/удаления Like

function handleButtonLike(evt) {
  if(evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')
  }
}

export {createCard, removeCard, handleButtonLike};