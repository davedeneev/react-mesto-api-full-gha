import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const ref = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: ref.current.value
        });
    }
    return (
        <PopupWithForm
            name='edit_avatar'
            title='Обновить аватар'
            titleBtn='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <label className="popup__input-block">
                <input ref={ref} name="avatar" type="url" id="input-profile-avatar" placeholder="Ссылка на картинку"
                       className="popup__input popup__input_type_avatar" required/>
                <span className="popup__input-error input-profile-avatar-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;