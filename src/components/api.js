export {getCardData, getUserData, editProfileRequest, postNewCard, deleteCardRequest, cardLikeRequest, cardDeleteLikeRequest, updateAvatarRequest} 

// запрос на получение  данных карточки 

function getCardData() {
     return fetch("https://nomoreparties.co/v1/wff-cohort-8/cards", {
        headers: {
          authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
        },
      })
        .then((res) => {
          return res.json();
        })
}


// запрос на создание новой карточки

function postNewCard(placeName, imageUrl) {
    return fetch("https://nomoreparties.co/v1/wff-cohort-8/cards", {
    method: "POST",
    headers: {
      authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: placeName,
      link: imageUrl,
    }),
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    } return Promise.reject(res.status);
  })
}

// запрос на получение информации о пользователе

function getUserData() {
    return fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me", {
        headers: {
          authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
        },
      })
        .then((res) => {
          return res.json();
        })
}

// запрос на редактирование профиля

function editProfileRequest(nameInput, jobInput) {
    return fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me", {
    method: "PATCH",
    headers: {
      authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput,
      about: jobInput,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}

// запрос на удаление карточек

function deleteCardRequest(cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    } return Promise.reject(res.status);
  })
}

// запрос на лайк карточки

function cardLikeRequest(cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    } return Promise.reject(res.status);
  })
}

// запрос на удаление лайка

function cardDeleteLikeRequest(cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    } return Promise.reject(res.status);
  })
}

// запрос на изминение аватарки

function updateAvatarRequest(urlInput) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: urlInput,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}