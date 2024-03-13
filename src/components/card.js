export {cardCreate, likeButtonFunction, deleteCard} 
    
//  функция создания карточки 

function cardCreate(cardData, deleteCardCallback, likeButtonCallback, openImageCallback) { 

    const cardTemplate = document.querySelector('#card-template'); 
    const cardElement = cardTemplate.content.cloneNode(true).querySelector('.card');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    const placesList = document.querySelector('.places__list'); 
  
  
    cardTitle.textContent = cardData.name;
    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
  
    deleteButton.addEventListener('click', function (evt) { 
          deleteCardCallback(cardElement); 
  }); 

    likeButton.addEventListener('click', function () {
    likeButtonCallback(likeButton);
  });
  
    cardImage.addEventListener('click', () => {
      openImageCallback(cardData.link, cardData.name);
    })
  
    placesList.append(cardElement);
  }

  // функция лайка картотчки

   function likeButtonFunction(button) {
    button.classList.toggle('card__like-button_is-active');
  }

  // функция удаления карточки

  function deleteCard(cardElement) {
    cardElement.remove();
  }

