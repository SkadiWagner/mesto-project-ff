//  логика открытия модалок

 function openModal(modalWindow) {
    modalWindow.classList.add('popup_is-opened')
    document.addEventListener('keydown', closeByEsc);
  }
  
//  логика закрытия модалок

 function closeModal(modalWindow) {
    modalWindow.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closeByEsc);
  }

// закрытие попапов через ESC

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openPopups = document.querySelectorAll('.popup_is-opened');
      openPopups.forEach(popup => {
        closeModal(popup);
      })
    }
  }

export {openModal, closeModal}