import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import ConfirmationPopup from "./ConfirmationPopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import * as auth from "../auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
    const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false);
    const [isConfirmationPopupOpen,setIsConfirmationPopupOpen] = useState(false);
    const [isRegStatusPopupOpen,setRegStatusPopupOpen] = useState(false)
    const [statusReg, setStatusReg] = useState(false);
    const [selectedCard, setSelectedCard]= useState({});
    const [isImagePopup, setImagePopup]= useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    function handleTokenCheck() {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    if (res) {
                        setEmail(res.email);
                        setLoggedIn(true);
                        navigate('/');
                    }
                })
                .catch(console.error);
        }
    }

    useEffect(() => {
        handleTokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
        Promise.all([api.getUser(), api.getInitialCards()])
            .then(([userInfo, initialCards]) => {
                setCurrentUser(userInfo);
                setCards(initialCards);
            })
            .catch(console.error);
    }}, [loggedIn]);

    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick () {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick () {
        setIsAddPlacePopupOpen(true);
    }

    function handleConfirmationClick () {
        setIsConfirmationPopupOpen(true);
    }

    function handleRegStatusClick (status) {
        setRegStatusPopupOpen(true);
        setStatusReg(status);
    }

    function handleCardClick (card) {
        setSelectedCard(card);
        setImagePopup(true);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus({
            id: card._id,
            isLiked: !isLiked
        }).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch(console.error);
    }

    function handleCardDelete(card) {
        api.deleteCard({
            id: card._id
        })
            .then(() => {
                setCards(state => state.filter(item => item._id !== card._id));
            })
            .catch(console.error);
    }

    function handleUpdateUser(user) {
        api.editUserProfile(user)
            .then((inputs) => {
                setCurrentUser(inputs);
                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleUpdateAvatar(user) {
        api.editUserAvatar(user)
            .then((inputs) => {
                setCurrentUser(inputs);
                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then((card) => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleRegister(data) {
        auth.register(data)
            .then(() => {
                handleRegStatusClick(true);
                navigate('/signin', { replace: true });
            })
            .catch((err) => {
                handleRegStatusClick(false);
                console.log({err});
            });
    }

    function handleLogin(data) {
        auth.authorize(data)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    setLoggedIn(true);
                    setEmail(data.email);
                    navigate('/', { replace: true })
                }
            })
            .catch((err) => {
                handleRegStatusClick(false);
                console.log({err});
            })
    }

    function handleSignOut() {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmationPopupOpen(false);
        setImagePopup(false);
        setRegStatusPopupOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="site">
                <div className="page">
                    <Header
                        email={email}
                        onSignOut={handleSignOut}
                    />
                    <Routes>
                        <Route exact path="/signup" element={
                            <Register onRegistration={handleRegister} />
                        }
                        />
                        <Route exact path="/signin" element={
                            <Login onLogin={handleLogin} />
                        }
                        />
                        <Route exact path="/" element={
                            <ProtectedRoute component={Main}
                                            loggedIn={loggedIn}
                                            onEditAvatar={handleEditAvatarClick}
                                            onEditProfile={handleEditProfileClick}
                                            onAddPlace={handleAddPlaceClick}
                                            onCardDeleteClick={handleConfirmationClick}
                                            onCardClick={handleCardClick}
                                            cards={cards}
                                            onCardLike={handleCardLike}
                                            onCardDelete={handleCardDelete} />
                        }
                        />
                        <Route path="/*" element={<Navigate to="/" replace/>} />
                    </Routes>
                    <Footer/>
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    <ConfirmationPopup
                        isOpen={isConfirmationPopupOpen}
                        onClose={closeAllPopups}
                    />
                    <InfoTooltip
                        isOpen={isRegStatusPopupOpen}
                        onClose={closeAllPopups}
                        status={statusReg}
                    />
                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopup}
                        onClose={closeAllPopups}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
  );
}

export default App;
