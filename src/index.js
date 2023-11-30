import './pages/index.css';
import { createCard, handleButtonLike} from'./components/card.js';
import { openModal, closeModal } from'./components/modal.js';
import {enableValidation, clearValidation} from'./components/validation.js';
import {loadingInfoProfile, loadingCards, editingProfileAvatar, editingProfile, addCardToServer, deleteCardFromServer} from'./components/api.js'
import {
  cardContainer,
  profileAvatarButton,
  profileAvatarModal,
  profileAvatarForm,
  profileAvatarInput,
  profileAvatarSubmitButton,
  profileName,
  profileDescription,
  profileImage,
  profileModal,
  profileButton,
  profileForm,
  profileNameInput,
  profileJobInput,
  newCardModal,
  newCardButton,
  newCardForm,
  newCardNameCityInput,
  newCardLinkImgInput,
  newCardFormButton,
  imagePopup,
  imageLink,
  imageText,
  cardСonfirmDeleteModal,
  cardRemoveForm,
  closeButtonsPopups,
  validationConfig,
  }from'./components/constants.js';

// ==========================================  Изначальный вывод карточек на страницу  =================================================

let myId = '';

Promise.all([loadingCards(), loadingInfoProfile()])
.then((data) => {
  profileName.textContent = data[1].name;
  profileDescription.textContent = data[1].about;
  profileImage.style.backgroundImage = `url('${data[1].avatar}')`;
  myId = data[1]['_id'];
    
  data[0].forEach( (el) => {
    cardContainer.append(createCard(el, handleButtonLike, handleImgPopup, handleСonfirmDeletePopup, myId));
  })
})
.catch(console.error)

// ==========================================  Добавление новой карточки  =================================================

function addCard(evt) {
  evt.preventDefault();

  newCardFormButton.textContent = 'Сохранение...';

  addCardToServer(newCardNameCityInput, newCardLinkImgInput)
  .then((result) => {
    cardContainer.prepend(createCard(result, handleButtonLike, handleImgPopup, handleСonfirmDeletePopup, myId))
  })
  .catch(console.error)
  .finally(() => {
    newCardFormButton.textContent = 'Сохранить';
  });

  evt.target.reset() // Очищаю значение в попапе
  closeModal(newCardModal);
}

newCardForm.addEventListener('submit', addCard);

// ==========================================  Окрытия Модального окна  =================================================

profileAvatarButton.addEventListener('click', () => {
  openModal(profileAvatarModal);
});

profileButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(profileModal);
});

newCardButton.addEventListener('click', () => {
  clearValidation(newCardForm, validationConfig);
  openModal(newCardModal);
});

function handleImgPopup(evt) {
  imageLink.src = evt.target.src;
  imageLink.alt = imageText.textContent = evt.target.alt;
  openModal(imagePopup);
}

function handleСonfirmDeletePopup(id) {
  cardRemoveForm.dataset.id = id;
  openModal(cardСonfirmDeleteModal);
}

// ==========================================  Закрытия Модального окна  =================================================

closeButtonsPopups.forEach((closeButton) => {
  closeButton.addEventListener('click', (el) => {
    const popup = el.target.closest('.popup');
    closeModal(popup);
  })
});

// ==========================================  Редактирование/Закрытия Avatar  =================================================

function handleProfileAvatarFormSubmit(evt) {
  evt.preventDefault();
  
  profileAvatarSubmitButton.textContent = 'Сохранение...'
  editingProfileAvatar(profileAvatarInput.value)
  .then(res => {
    profileAvatarButton.style.backgroundImage = `url('${res.avatar}')`;
    closeModal(profileAvatarModal);
  })
  .catch(console.error)
  .finally(() => {
    newCardFormButton.textContent = 'Сохранить';
  });
}

profileAvatarForm.addEventListener('submit', handleProfileAvatarFormSubmit);

// ==========================================  Редактирование/Закрытия профиля  =================================================

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;

  editingProfile(profileName.textContent, profileDescription.textContent)
  .catch(console.error);

  closeModal(profileModal);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// ==========================================  Удаление карточки  =================================================

function handleRemoveCard(evt) {
  evt.preventDefault();

  const cardId = cardRemoveForm.dataset.id; 

  deleteCardFromServer(cardId)
  .then(() => {
    const deleteTarget = document.querySelector(`[id='${cardId}']`);
    deleteTarget.remove();
    closeModal(cardСonfirmDeleteModal);
  })
.catch(console.error);

}

cardRemoveForm.addEventListener('click', handleRemoveCard)

// ==========================================  Валидация профиля  =================================================

enableValidation(validationConfig);