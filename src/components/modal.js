export {openModal, closeModal}
// Открытия Модального окна

function openModal(modal) {
  document.addEventListener('keydown', closeModalEsc);
  document.addEventListener('click', closeModalOverlay);
  modal.classList.add('popup_is-opened');
}

// Закрытия Модального окна

function closeModal(modal) { 
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
  document.removeEventListener('click', closeModalOverlay);
}

// Закрытия Модального окна при "Escape"

function closeModalEsc(evt) {
  if(evt.key === "Escape") {
    const modalActive = document.querySelector('.popup_is-opened');
    closeModal(modalActive)
}
}

// Закрытия Модального окна при Overlay

function closeModalOverlay(evt) {
  if(evt.target.classList.contains('popup_is-opened')) {
    const modalActive = document.querySelector('.popup_is-opened');
    closeModal(modalActive)
  }
}