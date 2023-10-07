import React from "react";

function ImagePopup({card, isOpen, onClose}) {
    return(
    <section className={`popup popup_type_img ${isOpen ? 'popup_opened' : false}`}>
        <div className="popup__container-img">
            <button
                type="button"
                className="popup__exit-btn"
                onClick={onClose}/>
            <img
                className="popup__img"
                src={card.link}
                alt={card.name}/>
            <h2 className="popup__desc-img">{card.name}</h2>
        </div>
    </section>
    );
}

export default ImagePopup;