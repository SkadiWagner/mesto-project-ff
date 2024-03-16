import "../pages/index.css";
import { cardCreate} from "../components/card";
import { openModal, closeModal } from "../components/modal";
import { getCardData, getUserData, editProfileRequest, postNewCard, deleteCardRequest, cardLikeRequest, cardDeleteLikeRequest, updateAvatarRequest } from "../components/api"

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
  updateAvatarRequest(profileImageInput.value).then(data => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
  })
  closeModal(newAvatarPopup);
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
  editProfileRequest(nameInput.value, jobInput.value).then(data => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(profileEditPopup);
  })
}

profileEditForm.addEventListener("submit", handleFormSubmit);

// функция создания новой карточки

const placeName = newCardPopup.querySelector(".popup__input_type_card-name");
const imageUrl = newCardPopup.querySelector(".popup__input_type_url");
const newCardForm = document.querySelector('[name="new-place"]');

function createNewCard(evt) {
  evt.preventDefault();
  postNewCard(placeName.value, imageUrl.value).then(data => {
    cards.unshift(data)
    createCardHendler(cards)
    closeModal(newCardPopup);
    placeName.value = "";
    imageUrl.value = "";
  })
}


newCardForm.addEventListener("submit", createNewCard);

// ВАЛИДАЦИИИИЯЯЯЯ

const validatorConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// показать ошибку

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// спрятать ошибку

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

// проверка валидности данных

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
inputElement.setCustomValidity("");
}

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validatorConfig
    );
  } else {
    hideInputError(formElement, inputElement, validatorConfig);
  }
};

// проверка есть ли в форме невалидные импуты

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// переключение кнопки disabled( true, false)

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

// обработчик  всех полей

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// обработчик всех форм ( включение валидации)

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

enableValidation(validatorConfig);

const clearValidation = (profileForm, validatorConfig) => {
  const errorList = profileForm.querySelectorAll(
    `.${validatorConfig.errorClass}`
  );
  errorList.forEach((error) => {
    error.textContent = "";
    error.classList.remove(validatorConfig.errorClass);
  });
};

// апи





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