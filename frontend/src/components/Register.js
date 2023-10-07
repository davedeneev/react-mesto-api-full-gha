import React, {useState} from "react";
import { Link } from "react-router-dom";

function Register({ onRegistration }){
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegistration(userData);
    }

    return (
        <div className="authorization">
            <h2 className="authorization__title">Регистрация</h2>
            <form className="authorization__form" onSubmit={handleSubmit}>
                <input className="authorization__form-input"
                       name="email"
                       type="email"
                       id="email"
                       value={userData.email}
                       onChange={handleChange}
                       placeholder="Email"
                       required/>
                <input className="authorization__form-input"
                       name="password"
                       type="password"
                       id="password"
                       value={userData.password}
                       onChange={handleChange}
                       placeholder="Пароль"
                       required/>
                <button className="authorization__submit-btn"
                        type="submit">Зарегистрироваться</button>
            </form>
            <div className="authorization__registered">
                <p className="authorization__registered-text">Уже зарегистрированы? </p>
                <Link className="authorization__registered-link" to="/signin">Войти</Link>
            </div>
        </div>
    )
}

export default Register;