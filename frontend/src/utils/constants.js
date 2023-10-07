export const formSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

export const popupProfile = '.popup_type-edit_profile';
export const popupAvatar = '.popup_type-edit_avatar';
export const popupCard = '.popup_type-add_card';
export const popupTypeImg = '.popup_type_img';
export const popupConfirm = '.popup_type-confirmation';
export const btnProfileEdit = document.querySelector('.profile__edit-btn');
export const btnAvatarEdit = document.querySelector('.profile__avatar-btn');
export const btnAddCard = document.querySelector('.profile__add-btn');
export const profileName = document.querySelector('.profile__name');
export const profileDesc = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__image');
export const profileNameInput = document.querySelector('input.popup__input.popup__input_type_name[name="name"]');
export const profileDescInput = document.querySelector('input.popup__input.popup__input_type_desc[name="about"]');
export const placesSection = '.places';