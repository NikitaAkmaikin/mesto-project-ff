// 1a10498b-0e1a-4d80-82be-5e39821adf2c
// wff-cohort-1

// ==========================================  Загрузка информации о пользователе с сервера  =================================================

const loadingInfoProfile = (profileName, profileDescription, profileImage) => {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-1/users/me', {
  method: 'GET',
  headers: {
    authorization: '1a10498b-0e1a-4d80-82be-5e39821adf2c'
  }
})
  .then(res => res.json())
  .then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileImage.style.backgroundImage = `url('${result.avatar}')`;
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен')
  })
}

// ==========================================  Загрузка карточек с сервера  =================================================

const loadingCards = (cardContainer, createCard, removeCard, handleButtonLike, handleImgPopup) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
  method: 'GET',
  headers: {
    authorization: '1a10498b-0e1a-4d80-82be-5e39821adf2c'
  }
})
  .then(res => res.json())
  .then((result) => {    
    result.forEach( (el) => {
      cardContainer.append(createCard(el, removeCard, handleButtonLike, handleImgPopup));
    })
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен')
  })
}
// ==========================================  Редактирование профиля  =================================================

const editingProfile = (profileNameInput, profileJobInput) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '1a10498b-0e1a-4d80-82be-5e39821adf2c',
  'Content-Type': 'application/json'
  },
    body: JSON.stringify({
    name: 'Marie Skłodowska Curie',
    about: 'Physicist and Chemist'
  })
})
  .then(res => res.json())
  .then((result) => {
    console.log(result.name);
    result.name = profileNameInput.value;
    result.about = profileJobInput.value;
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен')
  })
}

// ==========================================  Добавление новой карточки  =================================================

const addServerCard = (cardContainer, newCardNameCityInput, newCardLinkImgInput, createCard, removeCard, handleButtonLike, handleImgPopup) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
  method: 'Post',
  headers: {
    authorization: '1a10498b-0e1a-4d80-82be-5e39821adf2c',
  'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      name: newCardNameCityInput.value,
      link: newCardLinkImgInput.value
  })
})
  .then(res => res.json())
  .then((result) => {
    console.log(result.link);
    cardContainer.prepend(createCard(result, removeCard, handleButtonLike, handleImgPopup))
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен')
  })
}





export {loadingInfoProfile, loadingCards, editingProfile, addServerCard}