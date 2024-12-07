const config = {
  url: "https://nomoreparties.co/v1/wff-cohort-27",
  headers: {
    authorization: "a6cf7446-af3e-40d4-adc4-c3f7a39caaf5",
    "Content-Type": "application/json",
  },
};

const handleRequest = (request) => {
  if (request.ok) {
    return request.json();
  }
  return Promise.reject(`Ошибка: ${request.status}`);
};

export const getProfile = () => {
  return fetch(`${config.url}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleRequest);
};

export const getCards = () => {
  return fetch(`${config.url}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(handleRequest);
};

export const updateProfileOnServer = (name, about) => {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(handleRequest);
};

export const addCard = (name, link) => {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then(handleRequest);
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleRequest);
};

export const likeCardOnServer = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleRequest);
};

export const unlikeCardOnServer = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleRequest);
};

export const updateAvatarOnServer = (url) => {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(handleRequest);
};
