// функия проверки ответа от сервера

function checkResponse(res) {
    if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
}

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

export { checkResponse, renderLoading }
