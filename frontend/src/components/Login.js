import React, {useState} from "react";

function Login({ onLogin }){
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
        onLogin(userData);
    }

    return (
        <div className="authorization">
            <h2 className="authorization__title">Вход</h2>
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
                        type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;

