   export {cardCreate, likeButtonFunction, deleteCard}
   
   //  функция создания карточки

  function cardCreate(cardData, deleteCardCallback, likeButtonCallback, openImageCallback) {

    const cardTemplate = document.querySelector('#card-template');
  
  
    const cardElement = cardTemplate.content.cloneNode(true); 
  
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
  
  
    cardTitle.textContent = cardData.name;
    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
  
  
  
    deleteButton.addEventListener('click', function (evt) {
      const card = evt.target.closest('.card');
      if (card) {
          deleteCardCallback(card);
      }
  });
  
    likeButton.addEventListener('click', function () {
    likeButtonCallback(likeButton);
  });
  
    cardImage.addEventListener('click', () => {
      const imageSrc = cardImage.getAttribute('src');
      const caption = cardImage.getAttribute('alt');
      openImageCallback(imageSrc, caption);
    })
  
  return cardElement;
  }

  // функция лайка картотчки

   function likeButtonFunction(button) {
    button.classList.toggle('card__like-button_is-active');
  }

  // функция удаления карточки

     function deleteCard(cardElement) {
    cardElement.remove();
  }

