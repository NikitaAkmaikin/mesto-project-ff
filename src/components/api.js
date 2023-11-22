// 1a10498b-0e1a-4d80-82be-5e39821adf2c
// wff-cohort-1

const getProfile = (profileName, profileDescription, profileImage) => {return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-1/users/me', {
  headers: {
    authorization: '1a10498b-0e1a-4d80-82be-5e39821adf2c'
  }
})
  .then(res => res.json())
  .then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileImage.style.backgroundImage = `url('${data.avatar}')`;
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен')
  })
}

const loadingCards = (cardContainer,createCard, removeCard, handleButtonLike, handleImgPopup) => {return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
  
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






export {getProfile, loadingCards}