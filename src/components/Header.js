import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/css/navbar.css';
import logo from "../assets/img/main-logo.svg";
import { logout } from '../firebase-communication/firebase-auth';

function Header({isAdmin}) {
    const [t, i18n] = useTranslation("global");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <header className="navbar">
            <div className="navbar-container container">
            <input type="checkbox" id="menu-toggle" checked={isMenuOpen} onChange={toggleMenu} className="menu-toggle" />
                <label htmlFor="menu-toggle" className="hamburger">
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </label>
                <a href="/" className="logo">
                    <img src={logo} alt="Logo" />
                </a>
                
                <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="nav_list">
                        <li><a href="/order">{t("header.menu7")}</a></li>
                        <li onClick={toggleDropdown} className="dropdown">
                            <a href="#">{t("header.lang")}</a>
                            {isDropdownOpen && (
                                <ul className="dropdown-content">
                                    <li className="dropdawn-lang" onClick={() => handleLanguageChange('en')}><a href="#"><img class="lang-img" width="25" height="25" src="https://img.icons8.com/color/48/great-britain-circular.png" alt="great-britain-circular"/>EN</a></li>
                                    <li className="dropdawn-lang" onClick={() => handleLanguageChange('ua')}><a href="#"><img class="lang-img" width="25" height="25" src="https://img.icons8.com/color/48/ukraine-circular.png" alt="ukraine-circular"/>UA</a></li>
                                    <li className="dropdawn-lang" onClick={() => handleLanguageChange('pl')}><a href="#"><img class="lang-img" width="25" height="25" src="https://img.icons8.com/color/48/poland-circular.png" alt="poland-circular"/>PL</a></li>
                                </ul>
                            )}
                        </li>
                        {isAdmin && 
                            (
                            <li><a href="#" onClick={() => logout()}>{t("header.logout")}</a></li>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
