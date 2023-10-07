import successPic from "../images/success_pic.svg";
import unsuccessPic from "../images/unsuccess_pic.svg";
import React from "react";

function InfoTooltip(props) {
    return(
        <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__reg">
                <button
                    type="button"
                    className="popup__exit-btn"
                    onClick={props.onClose}
                />
                <img src={props.status ? successPic : unsuccessPic} className="popup__reg-img" alt="Статус авторизации"/>
                <h2 className="popup__reg-text">
                    {props.status
                    ? "Вы успешно зарегистрировались!"
                    : "Что-то пошло не так! Попробуйте ещё раз."}
                </h2>
            </div>
        </section>
    );
}
export default InfoTooltip;

