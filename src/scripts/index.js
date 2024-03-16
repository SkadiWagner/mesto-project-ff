import "../pages/index.css";
import { cardCreate} from "../components/card";
import { openModal, closeModal } from "../components/modal";
import { getCardData, getUserData, editProfileRequest, postNewCard, deleteCardRequest, cardLikeRequest, cardDeleteLikeRequest, updateAvatarRequest } from "../components/api"
import { enableValidation, clearValidation, validatorConfig } from "../components/validation";

//  функция открытия картинок

const popupImageDiv = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function openImage(imageSrc, caption) {
  popupImage.src = imageSrc;
  popupImage.alt = caption;
  popupCaption.textContent = caption;
  openModal(popupImageDiv);
}

// список с карточками

const placesList = document.querySelector(".places__list");




const popupsList = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");

const newAvatarPopup = document.querySelector('.popup_type_new-avatar')
const profileImage = document.querySelector('.profile__image');
const profileImageInput = document.querySelector('.popup__input_type_avatar-url')
const newAvatarForm = document.querySelector('[name="new-avatar"]');

let userId
let cards






// открытие модалки редактирования аватарки

profileImage.addEventListener("click", () => {
  openModal(newAvatarPopup);
});

// функция смены аватарки профиля 

function changeAvatar() {
  renderLoading(newAvatarForm, true);
  updateAvatarRequest(profileImageInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(newAvatarForm, false);
    });
}

// обработчик кнопки сохранить

newAvatarForm.addEventListener('submit', changeAvatar)


// обработчик кнопки открытия редактирования профиля

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profileEditPopup);
  const form = profileEditPopup.querySelector(validatorConfig.formSelector);
  clearValidation(form, validatorConfig);
});

// обработчик кнопки открытия для создания новых карточек

profileAddButton.addEventListener("click", () => {
  openModal(newCardPopup);
  const form = newCardPopup.querySelector(validatorConfig.formSelector);
  clearValidation(form, validatorConfig);
});

// обработчик закрытия по оверлею

popupsList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// закрытие попапов по кнопке

popupsList.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeModal(popup);
    });
  }
});

// загрузка при запросе 

function renderLoading(formElement, isLoading) {
  const button = formElement.querySelector('.popup__button')
  if(isLoading) {
    button.textContent = "Сохранение..."
    button.disabled = true
  } else {
    button.textContent = "Сохранить"
    button.disabled = false
  }
}

// редактирование профиля

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileEditForm = document.querySelector('[name="edit-profile"]');
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const jobInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);

// сохранение текущих значений полей Редактирования профиля

function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileEditForm, true);
  editProfileRequest(nameInput.value, jobInput.value).then(data => {
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

profileEditForm.addEventListener("submit", handleFormSubmit);

// функция создания новой карточки

const placeName = newCardPopup.querySelector(".popup__input_type_card-name");
const imageUrl = newCardPopup.querySelector(".popup__input_type_url");
const newCardForm = document.querySelector('[name="new-place"]');

function createNewCard(evt) {
  evt.preventDefault();
  renderLoading(newCardForm, true);
  postNewCard(placeName.value, imageUrl.value).then(data => {
    cards.unshift(data)
    createCardHendler(cards)
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
  getCardData().then(data => {
    cards = data
    createCardHendler(data)
  })
}


function deleteCardHendler(_id) {
  deleteCardRequest(_id).then(data => {
    const newCards = cards.filter(item => item._id !== _id)
    createCardHendler(newCards)
  })
}

function createCardHendler(data) {
  placesList.innerHTML = ""
  data.forEach((cardData) => {
    const card = cardCreate(cardData, deleteCardHendler, cardLikeHandler, openImage, userId)
    placesList.append(card);
  })
}

function cardLikeHandler(elem, card) {

  if(card.likes.some(el => el._id === userId)) {
  cardDeleteLikeRequest(card._id).then(data => {
    mutaitCards(data)
    createCardHendler(cards)  
  })
  } else {
    cardLikeRequest(card._id).then(data => {
      mutaitCards(data)
      createCardHendler(cards)  
  })
}}

function mutaitCards(data) {
  cards = cards.map(item => {
    if(item._id === data._id) return data
    return item
  })
}

// Загрузка информации о пользователе с сервера

function initializeProfile() {
  getUserData().then(data => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    console.log(data)
    userId = data._id
    initializeCards();
  })
}
initializeProfile();