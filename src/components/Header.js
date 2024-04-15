import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/css/navbar.css';
import logo from "../assets/img/main-logo.svg";

function Header() {
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
    };

    return (
        <header className="navbar">
            <div className="navbar-container container">
                <a href="/" className="logo">
                    <img src={logo} alt="Logo" />
                </a>
                <input type="checkbox" id="menu-toggle" checked={isMenuOpen} onChange={toggleMenu} className="menu-toggle" />
                <label htmlFor="menu-toggle" className="hamburger">
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </label>
                <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><a href="#home">{t("header.menu1")}</a></li>
                        <li><a href="#about">{t("header.menu2")}</a></li>
                        <li><a href="#services">{t("header.menu3")}</a></li>
                        <li><a href="#portfolio">{t("header.menu4")}</a></li>
                        <li><a href="#pricing">{t("header.menu5")}</a></li>
                        <li><a href="#blog">{t("header.menu6")}</a></li>
                        <li><a href="#contact">{t("header.menu7")}</a></li>
                        <li onClick={toggleDropdown} className="dropdown">
                            <a href="#">Languages</a>
                            {isDropdownOpen && (
                                <ul className="dropdown-content">
                                    <li onClick={() => handleLanguageChange('en')}><a href="#">EN</a></li>
                                    <li onClick={() => handleLanguageChange('ua')}><a href="#">UA</a></li>
                                    <li onClick={() => handleLanguageChange('pl')}><a href="#">PL</a></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;