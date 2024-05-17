import React from 'react';
import '../assets/css/hamburgermenu.css';
import '../assets/css/navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container container">
                <input type="checkbox" id="menu-toggle"/>
                <div className="hamburger-lines">
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>
                <ul className="menu-items">
                    <li><a href="/">Головна сторінка</a></li>
                    <li><a href="#pavement-area">Бруківка</a></li>
                    <li><a href="#tile-area">Плитка</a></li>
                    <li><a href="#slabs-area">Слеби</a></li>
                    <li><a href="#curbs-area">Бордюр</a></li>
                    <li><a href="#stone-types-catalog">Каталог каменю</a></li>
                    <li><a href="#">Замовити</a></li>
                </ul>
                <img className="logo" src={require('../assets/img/main-logo.svg').default} alt="Logo"/>
            </div>
        </nav>
    );
}

export default Navbar;
