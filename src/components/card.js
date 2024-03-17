//  функция создания карточки 

function cardCreate(cardData, deleteCardCallback, likeButtonCallback, openImageCallback, ownerId) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.like-count');
  
  const likesArray = cardData.likes;
  const likesCount = likesArray.length;
  likeCount.textContent = likesCount; 


  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  if(cardData.likes.some(item => item._id === ownerId)){
    likeButton.classList.add('card__like-button_is-active')
  } else {
    likeButton.classList.remove('card__like-button_is-active')
  }

  if(cardData.owner._id !== ownerId) {
    deleteButton.classList.add('card__delete-button-hidden');
  } else {
     deleteButton.addEventListener('click', function (evt) {
      cardElement.remove();
      deleteCardCallback(cardData._id);
  });
  }

  likeButton.addEventListener('click', function () {
      likeButtonCallback(likeButton, cardData, likeCount);
  });

  cardImage.addEventListener('click', () => {
      openImageCallback(cardData.link, cardData.name);
  });
  
  return cardElement;
}


export {cardCreate} 





