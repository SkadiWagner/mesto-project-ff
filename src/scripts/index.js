import "../pages/index.css";
import { cardCreate} from "../components/card";
import { openModal, closeModal } from "../components/modal";
import { getCardData, getUserData, editProfileRequest, postNewCard, deleteCardRequest, cardLikeRequest, cardDeleteLikeRequest, updateAvatarRequest } from "../components/api"
import { enableValidation, clearValidation, validatorConfig, toggleButtonState } from "../components/validation";
import { checkResponse, renderLoading} from "../components/utils"

// Переменные

const popupImageDiv = document.querySelector(".popup_type_image"); // попап с изображением
const popupImage = document.querySelector(".popup__image"); // содержимое попапа
const popupCaption = document.querySelector(".popup__caption"); // тайтл попапа

const placesList = document.querySelector(".places__list"); // список всех карточек

const popupsList = document.querySelectorAll(".popup"); // массив попапов
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка открытия попапа редактирования профиля
const profileEditPopup = document.querySelector(".popup_type_edit"); // попап редактирования профиля

const profileAddButton = document.querySelector(".profile__add-button"); // кнопка открытия попапа добавления карточек 
const newCardPopup = document.querySelector(".popup_type_new-card"); // попап создания карточек

const newAvatarPopup = document.querySelector('.popup_type_new-avatar') //попап  смены аватарки
const profileImage = document.querySelector('.profile__image'); // элемент с аватаркой на странице
const newAvatarForm = document.querySelector('[name="new-avatar"]'); // форма для смены аватарки
const profileImageInput = newAvatarForm.querySelector('.popup__input_type_avatar-url') // импут для редактирования аватарки

const profileTitle = document.querySelector(".profile__title"); // имя профиля на странице
const profileDescription = document.querySelector(".profile__description"); // описание профиля на странице
const profileEditForm = document.querySelector('[name="edit-profile"]'); // форма редактирования профиля
const nameInput = profileEditForm.querySelector(".popup__input_type_name"); // импут имя
const jobInput = profileEditForm.querySelector(".popup__input_type_description"); // импут описание

const newCardForm = document.querySelector('[name="new-place"]'); // форма создания новой карточки
const placeName = newCardPopup.querySelector(".popup__input_type_card-name"); //  импут создания новой карточки имя
const imageUrl = newCardPopup.querySelector(".popup__input_type_url"); // импут создания новой карточки ссылка


let userId
let cards

// функици для работы с попапами 

//  Открытие попапа с изображением

function openImage(imageSrc, caption) {
  popupImage.src = imageSrc;
  popupImage.alt = caption;
  popupCaption.textContent = caption;
  openModal(popupImageDiv);
}

// Открытие попапа редактирование аватарки

profileImage.addEventListener("click", () => {
  openModal(newAvatarPopup);
});

// функция смены аватарки профиля 

function changeAvatar() {
  renderLoading(newAvatarForm, true);
  updateAvatarRequest(profileImageInput.value)
    .then(checkResponse)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(newAvatarPopup)
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(newAvatarForm, false);
    });
}

// сохранение новой аватарки

newAvatarForm.addEventListener('submit', changeAvatar)

// редактирование профиля

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profileEditPopup);
  clearValidation(profileEditForm, validatorConfig);
});

// обработчик кнопки открытия  попапа для создания новых карточек

profileAddButton.addEventListener("click", () => {
  const button = newCardForm.querySelector('.popup__button')
  button.disabled = true
  button.classList.add(validatorConfig.inactiveButtonClass)
  openModal(newCardPopup);
  clearValidation(newCardForm, validatorConfig);
});


// закрытие попапов по кнопке крестика и оверелю

popupsList.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeModal(popup);
    });
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
  }
});

// сохранение текущих значений полей Редактирования профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileEditForm, true);
  editProfileRequest(nameInput.value, jobInput.value)
  .then(checkResponse)
  .then(data => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(profileEditPopup);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    renderLoading(profileEditForm, false);
  });
}

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// функция создания новой карточки

function createNewCard(evt) {
  evt.preventDefault();
  renderLoading(newCardForm, true);
  postNewCard(placeName.value, imageUrl.value)
  .then(checkResponse)
  .then(data => {
    const newCard = cardCreate(data, deleteCardHendler, cardLikeHandler, openImage, userId)
    placesList.prepend(newCard)
    closeModal(newCardPopup);
    placeName.value = "";
    imageUrl.value = "";
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    renderLoading(newCardForm, false);
  });
}

// обработчик кнопки создания новой карточки

newCardForm.addEventListener("submit", createNewCard);

// включение валидации

enableValidation(validatorConfig);

// функция инициализации карт на странице

function initializeCards() {
  getCardData()
  .then(checkResponse)
  .then(data => {
    cards = data
    createCardHendler(data)
  })
  .catch((err) => {
    console.error(err);
  })
}

// удаление карточек

function deleteCardHendler(_id) {
  deleteCardRequest(_id)
  .then(checkResponse)
  .catch((err) => {
    console.error(err);
  })
}

// создание карточек

function createCardHendler(data) {
  placesList.innerHTML = ""
  data.forEach((cardData) => {
    const card = cardCreate(cardData, deleteCardHendler, cardLikeHandler, openImage, userId)
    placesList.append(card);
  })
}

// обработчик лайков

function cardLikeHandler(elem, card, likeCount) {
  if(elem.classList.contains('card__like-button_is-active')) {
  cardDeleteLikeRequest(card._id)
  .then(checkResponse)
  .then(data => {
    likeCount.textContent = data.likes.length
    elem.classList.remove('card__like-button_is-active')
  })
  .catch((err) => {
    console.error(err);
  })
  } else {
    cardLikeRequest(card._id)
    .then(checkResponse)
    .then(data => {
      likeCount.textContent = data.likes.length
      elem.classList.add('card__like-button_is-active')
  })
  .catch((err) => {
    console.error(err);
  })
}}

// Загрузка информации о пользователе с сервера

function initializeProfile() {
  getUserData()
  .then(checkResponse)
  .then(data => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    userId = data._id
    initializeCards();
  })
  .catch((err) => {
    console.error(err);
  })
}

initializeProfile();

