import {addLikeServer, removeLikeServer} from'./api.js'

// @todo: Темплейт карточки

const templateCard = document.querySelector('#card-template').content;

// ============================================  Функция создания карточки  ============================================= <

function createCard(cardStorage, handleButtonLike, handleImgPopup, handleСonfirmDeletePopup) {
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
  } else {
    cardRemoveButton.addEventListener('click', () => {
      handleСonfirmDeletePopup(cardId);
  });
  }

  cardLikeButton.addEventListener('click', (evt) => handleButtonLike(evt, cardId, cardLikeCount)); // Обработчик LIKE
  cardImg.addEventListener('click', handleImgPopup); // Обработчик Img для попапа

  return card;
}

// ============================================  Добавлениея/удаления Like  ============================================= <

function handleButtonLike(evt, cardId, cardLikeCount) {
  if(!evt.target.classList.contains('card__like-button_is-active')) {

    addLikeServer(cardId)
    .then(res => {
      evt.target.classList.add('card__like-button_is-active');
      cardLikeCount.textContent = res.likes.length;
    })
    .catch(err => console.log(err))
    
  } else {
    removeLikeServer(cardId)
    .then(res => {
      evt.target.classList.remove('card__like-button_is-active')
      cardLikeCount.textContent = res.likes.length;
    })
    .catch(err => console.log(err))
  };
}

export {createCard, handleButtonLike};