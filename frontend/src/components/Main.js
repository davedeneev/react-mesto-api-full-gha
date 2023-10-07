import React, { useContext } from 'react';
import Card from './Card.js';
import editPic from '../images/edit_pic.svg';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return(
        <main>
            <section className="profile">
                <div className="profile__wrapper">
                    <img
                        className="profile__image"
                        src={currentUser.avatar}
                        alt="Аватар пользователя"
                    />
                    <button
                        type="button"
                        className="profile__avatar-btn"
                        onClick={props.onEditAvatar}>
                        <img
                            className="profile__edit-avatar"
                            src={editPic}
                            alt="Аватар пользователя"
                        />
                    </button>
                    <div className="profile__info">
                        <div className="profile__name-block">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button
                                type="button"
                                aria-label="Редактировать"
                                className="profile__edit-btn"
                                onClick={props.onEditProfile}
                            />
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__add-btn"
                    onClick={props.onAddPlace}
                />
            </section>
            <section className="places">
                {props.cards.map((data) => (
                    <Card
                        key={data['_id']}
                        card={data}
                        onCardDeleteClick={props.onCardDeleteClick}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}/>
                ))}
            </section>
        </main>
    );
}

export default Main;