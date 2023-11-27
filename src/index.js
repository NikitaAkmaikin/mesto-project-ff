import './pages/index.css';
import { createCard, handleButtonLike} from'./components/card.js';
import { openModal, closeModal } from'./components/modal.js';
import {enableValidation, clearValidation} from'./components/validation.js';
import {loadingInfoProfile, loadingCards, editingProfileAvatar, editingProfile, addCardToServer, deleteCardFromServer} from'./components/api.js'

// ==========================================  DOM узлы  =================================================

const cardContainer = document.querySelector('.places__list');

const profileAvatarButton = document.querySelector('.profile__image');
const profileAvatarModal = document.querySelector('.popup_avatar');
const profileAvatarForm = document.forms['avatar-profile'];
const profileAvatarInput = profileAvatarForm.elements.link;

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image');

const profileModal = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];
const profileNameInput = profileForm.elements.name;
const profileJobInput = profileForm.elements.description;

const newCardModal = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const newCardForm = document.forms['new-place'];
const newCardNameCityInput = newCardForm.elements['place-name'];
const newCardLinkImgInput = newCardForm.elements.link;

const imagePopup = document.querySelector('.popup_type_image');
const imageLink = imagePopup.querySelector('.popup__image');
const imageText = imagePopup.querySelector('.popup__caption');

const cardСonfirmDeleteModal = document.querySelector('.popup_confirm-delete-card');
const cardRemoveForm = document.forms['delete-card'];
// const cardRemoveFormButton = cardRemoveForm.querySelector('.popup__button');

const closeButtonsPopups  = document.querySelectorAll('.popup__close');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// ==========================================  Изначальный вывод карточек на страницу  =================================================

Promise.all([loadingCards, loadingInfoProfile])
.then(() => {

  loadingCards()
  .then((result) => {    
    result.forEach( (el) => {
      cardContainer.append(createCard(el, handleButtonLike, handleImgPopup, handleСonfirmDeletePopup));
    })
  });

  loadingInfoProfile()
  .then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileImage.style.backgroundImage = `url('${result.avatar}')`;
  })

})
.catch(err => {
  console.log(err)
})

// ==========================================  Добавление новой карточки  =================================================

function addCard(evt) {
  evt.preventDefault();

  addCardToServer(newCardNameCityInput, newCardLinkImgInput)
  .then((result) => {
    cardContainer.prepend(createCard(result, handleButtonLike, handleImgPopup, handleСonfirmDeletePopup))
  })
  .catch(err => {
    console.log(err)
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

  editingProfileAvatar(profileAvatarInput.value)
  .then(res => {
    profileAvatarButton.style.backgroundImage = `url('${res.avatar}')`;
    console.log(res)
    closeModal(profileAvatarModal);

  })
}

profileAvatarForm.addEventListener('submit', handleProfileAvatarFormSubmit);

// ==========================================  Редактирование/Закрытия профиля  =================================================

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;

  editingProfile(profileName.textContent, profileDescription.textContent);
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
}

cardRemoveForm.addEventListener('click', handleRemoveCard)

// ==========================================  Валидация профиля  =================================================

enableValidation(validationConfig);