import { checkResponse} from "../components/utils.js"

const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: 'a6a35dc9-40f1-4005-a8ef-c23ae2740d6c',
    'Content-Type': 'application/json',
  },
};

// запрос на получение  данных карточки 

function getCardData() {
     return fetch(`${apiConfig.baseUrl}/cards`, {
        headers: apiConfig.headers
      })
      .then(checkResponse)
  }

// запрос на создание новой карточки

function postNewCard(placeName, imageUrl) {
    return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: placeName,
      link: imageUrl,
    }),
  })
  .then(checkResponse)
}

// запрос на получение информации о пользователе

function getUserData() {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
       headers: apiConfig.headers,
      })
      .then(checkResponse)
  }

// запрос на редактирование профиля

function editProfileRequest(nameInput, jobInput) {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput,
    }),
  })
  .then(checkResponse)
}

// запрос на удаление карточек

function deleteCardRequest(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
  .then(checkResponse)
}

// запрос на лайк карточки

function cardLikeRequest(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  })
  .then(checkResponse)
}

// запрос на удаление лайка

function cardDeleteLikeRequest(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
  .then(checkResponse)
}

// запрос на редактирование  аватарки

function updateAvatarRequest(urlInput) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: urlInput,
    }),
  })
  .then(checkResponse)
}

export {getCardData, getUserData, editProfileRequest, postNewCard, deleteCardRequest, cardLikeRequest, cardDeleteLikeRequest, updateAvatarRequest}