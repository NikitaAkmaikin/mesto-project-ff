const token = "1a10498b-0e1a-4d80-82be-5e39821adf2c";
// wff-cohort-1

const apiData = () => {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-1/cards', {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
  .then(handleResponse)
}

// apiData()

// ==========================================  Загрузка информации о пользователе с сервера  =================================================

const loadingInfoProfile = () => {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-1/users/me', {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
  .then(handleResponse)
}

// ==========================================  Загрузка карточек с сервера  =================================================

const loadingCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
  .then(handleResponse)
}

// ==========================================  Редактирование Аватара  =================================================

const editingProfileAvatar = (profileAvatatInput) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: token,
    'Content-Type': 'application/json'
    },
      body: JSON.stringify({
      avatar: profileAvatatInput,
    })
  })
  .then(handleResponse)
  .catch((err) => {
    console.log(err)
  });
}

// ==========================================  Редактирование профиля  =================================================

const editingProfile = (profileName, profileDescription) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
    method: 'PATCH',
    headers: {
      authorization: token,
    'Content-Type': 'application/json'
    },
      body: JSON.stringify({
      name: profileName,
      about: profileDescription
    })
  })
  .catch((err) => {
    console.log(err)
  })
}

// ==========================================  Добавление новой карточки  =================================================

const addCardToServer = (newCardNameCityInput, newCardLinkImgInput) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
    method: 'POST',
    headers: {
      authorization: token,
    'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: newCardNameCityInput.value,
        link: newCardLinkImgInput.value
    })
  })
  .then(handleResponse)
}

// ==========================================  Удаление новой карточки  =================================================

const deleteCardFromServer = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    'Content-Type': 'application/json'
    }
  })
  .then(handleResponse)
}








const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export {loadingInfoProfile, loadingCards, editingProfileAvatar, editingProfile, addCardToServer, deleteCardFromServer}