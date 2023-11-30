// ==========================================  DOM узлы  =================================================

const cardContainer = document.querySelector('.places__list');

const profileAvatarButton = document.querySelector('.profile__image');
const profileAvatarModal = document.querySelector('.popup_avatar');
const profileAvatarForm = document.forms['avatar-profile'];
const profileAvatarInput = profileAvatarForm.elements.link;
const profileAvatarSubmitButton = profileAvatarForm.querySelector('.popup__button');

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
const newCardFormButton = newCardForm.querySelector('.popup__button');

const imagePopup = document.querySelector('.popup_type_image');
const imageLink = imagePopup.querySelector('.popup__image');
const imageText = imagePopup.querySelector('.popup__caption');

const cardСonfirmDeleteModal = document.querySelector('.popup_confirm-delete-card');
const cardRemoveForm = document.forms['delete-card'];

const closeButtonsPopups  = document.querySelectorAll('.popup__close');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export {
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
}