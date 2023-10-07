import React from "react";

function PopupWithForm(props) {
    return(
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__exit-btn"
                    onClick={props.onClose}
                />
                <h2 className="popup__title">{props.title}</h2>
                <form name={`popup_${props.name}`} className="popup__form" onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__save-btn">
                        {props.titleBtn}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;