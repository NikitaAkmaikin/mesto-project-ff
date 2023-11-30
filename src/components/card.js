import {addLikeServer, removeLikeServer} from'./api.js'

// @todo: Темплейт карточки

const templateCard = document.querySelector('#card-template').content;

// ============================================  Функция создания карточки  ============================================= <

function createCard(cardStorage, handleButtonLike, handleImgPopup, handleСonfirmDeletePopup, myId) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardRemoveButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikeCount = card.querySelector('.card__like-counter');
  const cardId = card.id = cardStorage["_id"];
  const apiUserId = cardStorage.owner._id;


  cardImg.src = cardStorage.link;
  cardTitle.textContent = cardImg.alt = cardStorage.name;
  cardLikeCount.textContent = cardStorage.likes.length;

  if(apiUserId !== myId) { // удаление кнопки DELETE с чужой карточки
    cardRemoveButton.style.display = 'none';
  } else {  
    cardRemoveButton.addEventListener('click', () => {
      handleСonfirmDeletePopup(cardId);
  });
  }

  if (cardStorage.likes.find((el) => el._id === myId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
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
    .catch(console.error);
    
  } else {
    removeLikeServer(cardId)
    .then(res => {
      evt.target.classList.remove('card__like-button_is-active')
      cardLikeCount.textContent = res.likes.length;
    })
    .catch(console.error);
  };
}

export {createCard, handleButtonLike};