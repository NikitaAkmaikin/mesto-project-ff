// Форма добавления карточки

// Добавление карточки

// Лайк карточки

// Открытие попапа с картинкой

// Плавное открытие и закрытие попапов



// @todo: Темплейт карточки

const templateCard = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

function createCard(cardStorage, removeCard) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonRemove = card.querySelector('.card__delete-button');
  const buttonLike = card.querySelector('.card__like-button');


  cardImg.src = cardStorage.link;
  cardTitle.textContent = cardImg.alt = cardStorage.name;

  buttonRemove.addEventListener('click', removeCard);
  // ========================================================================================== <
  // Функция Like

  card.addEventListener('click', function (evt) {
    if(evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active')
    }
    });

  // ========================================================================================== <

  return card;
}

// @todo: Функция удаления карточки

function removeCard(event) {
  const deleteTarget = event.target.closest('.card');
  deleteTarget.remove();
}

export {createCard, removeCard};
