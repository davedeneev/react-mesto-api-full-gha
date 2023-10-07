import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({card,onCardClick,onCardLike,onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id || card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `place-card__like-btn ${isLiked && 'place-card__like-btn_active'}`
    );

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="place-card">
            <img
                className="place-card__image"
                src={card.link}
                alt={card.name}
                onClick={() => onCardClick({link: card.link, name: card.name})}
            />
            {isOwn && <button className="place-card__delete-btn"
                    type="button"
                    onClick={handleDeleteClick}>
            </button>}
            <div className="place-card__description">
                <h2 className="place-card__title">{card.name}</h2>
                <div className="place-card__like-block">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="place-card__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>

    )
}

export default Card;