import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {
    return (
        <PopupWithForm
            name='confirmation'
            title='Вы уверены?'
            titleBtn='Да'
            isOpen={props.isOpen}
            onClose={props.onClose}>
        </PopupWithForm>
    )
}

export default ConfirmationPopup;