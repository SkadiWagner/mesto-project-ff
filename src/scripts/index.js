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
  popupImage.alt = caption
  popupCaption.textContent = caption
  openModal(popupImageDiv);
}

// список с карточками 

const placesList = document.querySelector('.places__list'); 

// добавление карточек на страницу

initialCards.forEach(function (cardData) {
  const cardElement = cardCreate(cardData, deleteCard, likeButtonFunction, openImage);
  placesList.append(cardElement);
});

// ----



  const popupsList = document.querySelectorAll('.popup')
  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileEditPopup = document.querySelector('.popup_type_edit');
  const profileAddButton = document.querySelector('.profile__add-button');
  const newCardPopup = document.querySelector('.popup_type_new-card');


// обработчик кнопки открытия редактирования профиля

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent 
  jobInput.value = profileDescription.textContent 
  openModal(profileEditPopup);
});

// обработчик кнопки открытия для создания новых карточек

profileAddButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

// обработчик закрытия по оверлею

popupsList.forEach((popup) =>  {
  popup.addEventListener('mousedown', evt => {
    if (evt.target === popup) {
      closeModal(popup);
    }
 });
})

// закрытие попапов по кнопке 


popupsList.forEach((popup) =>  {
  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closeModal(popup);
    })
  }
})


// редактирование профиля 
 
const profileTitle = document.querySelector('.profile__title') 
const profileDescription = document.querySelector('.profile__description') 
 
const profileEditForm = document.querySelector('[name="edit-profile"]');
const nameInput = profileEditForm.querySelector('.popup__input_type_name') 
const jobInput = profileEditForm.querySelector('.popup__input_type_description') 

// сохранение текущих значений полей Редактирования профиля



 
function handleFormSubmit(evt) { 
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value 
    profileDescription.textContent = jobInput.value 
    closeModal(profileEditPopup) 
} 
 
profileEditForm.addEventListener('submit', handleFormSubmit)
 
 // функция создания новой карточки  

 const placeName = newCardPopup.querySelector('.popup__input_type_card-name')
 const imageUrl = newCardPopup.querySelector('.popup__input_type_url')
 const newCardForm = document.querySelector('[name="new-place"]');
 
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
 
 newCardForm.addEventListener('submit', createNewCard)
  




