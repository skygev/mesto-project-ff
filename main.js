(()=>{"use strict";var e,t={url:"https://nomoreparties.co/v1/wff-cohort-27",headers:{authorization:"a6cf7446-af3e-40d4-adc4-c3f7a39caaf5","Content-Type":"application/json"}},r=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(e){return fetch("".concat(t.url,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then(r)},o=function(e){return fetch("".concat(t.url,"/cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then(r)};function c(e,c,a,u,i,l,s){var d=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),p=d.querySelector(".card__image"),_=d.querySelector(".card__likes-counter"),f=d.querySelector(".card__delete-button"),y=d.querySelector(".card__like-button"),m=a.some((function(e){return e._id===i}));return d.querySelector(".card__title").textContent=e,p.src=c,p.alt=e,a.length>0?(_.textContent=a.length,_.style.display=""):_.style.display="none",m&&y.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){return s(c,e)})),y.addEventListener("click",(function(){var e=y.classList.contains("card__like-button_is-active");(e?o:n)(u).then((function(t){y.classList.toggle("card__like-button_is-active",!e),_.textContent=t.likes.length,_.style.display=t.likes.length>0?"":"none"})).catch((function(e){return console.error("Ошибка лайка:",e)}))})),i===l?f.addEventListener("click",(function(){(function(e){return fetch("".concat(t.url,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then(r)})(u).then((function(){d.remove()})).catch((function(e){return console.error("Ошибка удаления карточки:",e)}))})):f.style.display="none",d}function a(e){e.classList.add("popup_is-animated"),e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)}function u(e){e.classList.remove("popup_is-animated"),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i);var t=e.querySelector(".popup__button");t&&(t.disabled=!0,t.classList.add("popup__button_disabled"))}function i(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&u(t)}}function l(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));o&&(o.textContent=r,o.classList.add(n.errorActiveClass),t.classList.add(n.inputErrorClass))}function s(e,t,r){e.some((function(e){return!e.validity.valid}))?(t.setAttribute("disabled",!0),t.classList.add(r.inactiveButtonClass)):(t.removeAttribute("disabled"),t.classList.remove(r.inactiveButtonClass))}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}console.log("Все импорты выполнены успешно");var p=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),f=document.querySelector(".profile__image"),y=document.querySelector(".places__list"),m=document.querySelector(".popup__image"),v=document.querySelector(".popup__caption"),h=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),b=document.querySelector(".popup_type_image"),q=document.querySelector(".popup_type_avatar"),E=document.querySelector(".profile__image-container"),g=document.querySelector(".popup_type_edit .popup__form"),L=document.querySelector(".popup_type_new-card .popup__form"),k=document.querySelector(".popup_type_avatar .popup__form"),C=document.querySelector(".popup__input_type_name"),A=document.querySelector(".popup__input_type_description"),x=L.querySelector(".popup__input_type_card-name"),w=L.querySelector(".popup__input_type_url"),T=q.querySelector("#avatar-input"),j=document.querySelector(".profile__edit-button"),O=document.querySelector(".profile__add-button");function P(e){p.textContent=e.name,_.textContent=e.about,f.style.backgroundImage="url(".concat(e.avatar,")")}function B(e,t){m.src=e,m.alt=t,v.textContent=t,a(b)}function D(e,t){t?(e.textContent="Сохранение...",e.disabled=!0):(e.textContent="Сохранить",e.disabled=!1)}j.addEventListener("click",(function(){C.value=p.textContent,A.value=_.textContent,a(h)})),E.addEventListener("click",(function(){k.reset(),a(q)})),k.addEventListener("submit",(function(e){var n;e.preventDefault(),D(e.target.querySelector(".popup__button"),!0),(n=T.value,fetch("".concat(t.url,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then(r)).then((function(e){f.style.backgroundImage="url(".concat(e.avatar,")"),u(q),k.reset()})).catch((function(e){console.error("Ошибка обновления аватара:",e)}))})),O.addEventListener("click",(function(){L.reset(),a(S)})),g.addEventListener("submit",(function(e){e.preventDefault();var n,o,c=e.target.querySelector(".popup__button");D(c,!0),(n=C.value,o=A.value,fetch("".concat(t.url,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:n,about:o})}).then(r)).then((function(e){P(e),u(h)})).catch((function(e){console.error("Ошибка обновления профиля:",e)})).finally((function(){D(c,!1)}))})),L.addEventListener("submit",(function(n){n.preventDefault();var o,a,i=n.target.querySelector(".popup__button");D(i,!0),(o=x.value,a=w.value,fetch("".concat(t.url,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:o,link:a})}).then(r)).then((function(t){var r=c(t.name,t.link,t.likes,t._id,e,t.owner._id,B);y.prepend(r),L.reset(),u(S)})).catch((function(e){console.error("Ошибка добавления карточки:",e)})).finally((function(){return D(i,!1)}))})),document.querySelectorAll(".popup__close").forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return u(t)}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&u(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);s(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?l(e,t,t.dataset.errorMessage||"Некорректный ввод",r):t.validity.valid?function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));n&&(n.classList.remove(r.errorActiveClass),n.textContent="",t.classList.remove(r.inputErrorClass))}(e,t,r):l(e,t,t.validationMessage,r)}(e,o,t),s(r,n,t)}))}))}(t,e)}))}({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible",errorActiveClass:"popup__input-error_active"}),Promise.all([fetch("".concat(t.url,"/users/me"),{method:"GET",headers:t.headers}).then(r),fetch("".concat(t.url,"/cards"),{method:"GET",headers:t.headers}).then(r)]).then((function(t){var r,n,o=(n=2,function(e){if(Array.isArray(e))return e}(r=t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(r,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(e,t):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],u=o[1];e=a._id,P(a),function(e,t){e.forEach((function(e){var r=c(e.name,e.link,e.likes,e._id,t,e.owner._id,B);y.append(r)}))}(u,e)})).catch((function(e){return console.error("Ошибка загрузки данных:",e)}))})();