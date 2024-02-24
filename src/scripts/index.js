import '../pages/index.css';
import {initialCards} from './cards'
import {cardCreate, likeButtonFunction, deleteCard} from '../components/card'
import {openModal, closeModal} from '../components/modal'


//  функция открытия картинок

const popupImageDiv = document.querySelector('.popup_type_image')
const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption')

function openImage(imageSrc, caption) {
  popupImage.src = imageSrc
  popupCaption.textContent = caption
  openModal(popupImageDiv);
}

// список с карточками 

const placesList = document.querySelector('.places__list'); 

// добавление карточек на страницу

initialCards.forEach(function (cardData) {
  const cardElement = cardCreate(cardData, deleteCard, likeButtonFunction, openImage);
  placesList.appendChild(cardElement);
});

// ----

  const popup = document.querySelector('.popup') // мб удалить надо 

  const popups = document.querySelectorAll('.popup')
  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileEditPopup = document.querySelector('.popup_type_edit');
  const profileAddButton = document.querySelector('.profile__add-button');
  const newCardPopup = document.querySelector('.popup_type_new-card');
  const popupClose = document.querySelectorAll('.popup__close');

// обработчик кнопки открытия редактирования профиля

profileEditButton.addEventListener('click', () => {
  openModal(profileEditPopup);
});

// обработчик кнопки открытия для создания новых карточек

profileAddButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

// обработчик закрытия по оверлею

popups.forEach((popup) =>  {
  popup.addEventListener('click', evt => {
    if (evt.target === popup) {
      popup.classList.remove('popup_is-opened')
    }
 });
})

// закрытие попапов по кнопке 

popups.forEach(popup => {
  popupClose.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
    closeModal(popup);
    });
  });
})

// редактирование профиля

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')

// сохранение текущих значений полей Редактирования профиля

nameInput.value = profileTitle.textContent
jobInput.value = profileDescription.textContent

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    closeModal(popup)
}

formElement.addEventListener('submit', handleFormSubmit)

 // функция создания новой карточки 

//  const newCardForm = document.querySelector('.popup_type_new-card');
 const placeName = newCardPopup.querySelector('.popup__input_type_card-name')
 const imageUrl = newCardPopup.querySelector('.popup__input_type_url')
 
 function createNewCard(evt) {
   evt.preventDefault();
   const newCardData = {
     name: placeName.value,
     link: imageUrl.value,
   }
   const newCardElement = cardCreate(newCardData, deleteCard, likeButtonFunction, openImage)
   placesList.prepend(newCardElement);
   placeName.value = '';
   imageUrl.value = '';
   closeModal(newCardPopup);
 }
 
 newCardPopup.addEventListener('submit', createNewCard)
  




