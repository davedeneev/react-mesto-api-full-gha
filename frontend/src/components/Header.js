import headerLogo from '../images/header-logo.svg';
import { Route, Routes, Link} from 'react-router-dom';

function Header({ email, onSignOut }) {
    return(
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Место"/>
            <Routes>
                <Route path="/signin" element={<Link to="/signup" className="header__link header__link-signin ">Регистрация</Link>} />
                <Route path="/signup" element={<Link to="/signin" className="header__link header__link-signin ">Войти</Link>} />
                <Route path="/" element={
                    <>
                        <div className="header__links">
                            <p className="header__email">{email}</p>
                            <a className="header__link header__link-signout" onClick={onSignOut}>Выйти</a>
                        </div>
                    </>
                } />
            </Routes>
        </header>
    )
}

export default Header;