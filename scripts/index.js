// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


function cardCreate(cardData, deleteCardCallback) {

    const cardTemplate = document.querySelector('#card-template');
  

    const cardElement = cardTemplate.content.cloneNode(true);
  

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
  

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;


  deleteButton.addEventListener('click', function () {
    deleteCardCallback(this.parentNode);
});


  return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

  const placesList = document.querySelector('.places__list');
  

  initialCards.forEach(function (cardData) {
    const cardElement = cardCreate(cardData, deleteCard);
    placesList.appendChild(cardElement);
  });




  