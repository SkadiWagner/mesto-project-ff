import "../pages/index.css";
import { initialCards } from "./cards";
import { cardCreate, likeButtonFunction, deleteCard } from "../components/card";
import { openModal, closeModal } from "../components/modal";

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

// добавление карточек на страницу

// initialCards.forEach(function (cardData) {
//   const cardElement = cardCreate(cardData, deleteCard, likeButtonFunction, openImage);
//   placesList.append(cardElement);
// });

// ----

const popupsList = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");

// обработчик кнопки открытия редактирования профиля

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profileEditPopup);
  const form = profileEditPopup.querySelector(validatorConfig.formSelector);
  console.log("123123", form);
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

  // Отправка запроса на сервер
  fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me", {
    method: "PATCH",
    headers: {
      authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileEditPopup);
    })
    .catch((error) => {
      console.error("Ошибка при отправке запроса на сервер:", error);
    });
}

profileEditForm.addEventListener("submit", handleFormSubmit);

// функция создания новой карточки

const placeName = newCardPopup.querySelector(".popup__input_type_card-name");
const imageUrl = newCardPopup.querySelector(".popup__input_type_url");
const newCardForm = document.querySelector('[name="new-place"]');



function createNewCard(evt) {
  evt.preventDefault();

  fetch("https://nomoreparties.co/v1/wff-cohort-8/cards", {
    method: "POST",
    headers: {
      authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: placeName.value,
      link: imageUrl.value,
    }),
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    } return Promise.reject(res.status);
  })
  .then((card) => {
    debugger;
    addCard(card);
  })

  closeModal(newCardPopup);
}

function addCard(newCardData) {
  const newCardElement = cardCreate(newCardData, deleteCard, likeButtonFunction, openImage)
  placesList.prepend(newCardElement);
  placeName.value = "";
  imageUrl.value = "";
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

// Загрузка информации о пользователе с сервера

function initializeProfile() {
  fetch("https://nomoreparties.co/v1/wff-cohort-8/users/me", {
    headers: {
      authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
    },
  })
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    });
}

initializeProfile();

// Загрузка карточек с сервера

function initializeCards() {
  fetch("https://nomoreparties.co/v1/wff-cohort-8/cards", {
    headers: {
      authorization: "a6a35dc9-40f1-4005-a8ef-c23ae2740d6c",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((cardData) => {
        cardCreate(cardData, deleteCard, likeButtonFunction, openImage);
        console.log(data);
      });
    });
}

initializeCards();
