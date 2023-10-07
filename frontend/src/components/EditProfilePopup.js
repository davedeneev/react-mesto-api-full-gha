import React, {useContext, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='edit_profile'
            title='Редактировать профиль'
            titleBtn='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <label className="popup__input-block">
                <input name="name" type="text" id="input-profile-name" placeholder="Имя"
                       className="popup__input popup__input_type_name"
                       minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange} required/>
                    <span className="popup__input-error input-profile-name-error"></span>
            </label>
            <label className="popup__input-block">
                <input name="about" type="text" id="input-profile-desc" placeholder="О себе"
                       className="popup__input popup__input_type_desc"
                       minLength="2" maxLength="200" value={description || ''} onChange={handleDescriptionChange} required/>
                    <span className="popup__input-error input-profile-desc-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;