export {createCard, removeCard};

// @todo: Темплейт карточки

const templateCard = document.querySelector('#card-template').content;

// ============================================  Функция создания карточки  ============================================= <

function createCard(cardStorage, removeCard, buttonLike, imgPopup) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonRemove = card.querySelector('.card__delete-button');

  cardImg.src = cardStorage.link;
  cardTitle.textContent = cardImg.alt = cardStorage.name;

  buttonRemove.addEventListener('click', removeCard); // Удаление карточки
  card.addEventListener('click', buttonLike); // Обработчик LIKE
  cardImg.addEventListener('click', imgPopup); // Обработчик Img для попапа

  return card;
}

// ============================================  Функция удаления карточки  ============================================= <

function removeCard(event) {
  const deleteTarget = event.target.closest('.card');
  deleteTarget.remove();
}