import React from 'react';
import earthIcon from '../assets/img/earth-svg.svg';
import moneyIcon from '../assets/img/money-svg.svg';
import instrumentsIcon from '../assets/img/instruments-svg.svg';
import mindIcon from '../assets/img/mind-svg.svg';
import "../assets/css/footer.css"
import footerBg from '../assets/img/footer_bg.jpg';

function Footer() {
    return (
        <div className="footer">
            <div className="order-block" style={{ backgroundImage: `url(${footerBg})`}}>
                <div className="order-container">
                    <div className="text1">Вироби на замовлення від POLISSYA GRANITE</div>
                    <div className="text2">
                        Пропонуємо виготовлення виробів з натурального каменю за вашими ескізами та проектами.
                        Виготовляємо будь-які вироби з натурального каменю за цінами без посередників.
                    </div>
                    <div className="order-block-icons">
                        <div className="order-icon">
                            <img src={earthIcon} alt="Worldwide Shipping" />
                            <div>Доставка по всьому світу</div>
                        </div>
                        <div className="order-icon">
                            <img src={moneyIcon} alt="Individual Prices" />
                            <div>Індивідуальні ціни</div>
                        </div>
                        <div className="order-icon">
                            <img src={instrumentsIcon} alt="Custom Orders" />
                            <div>Виготовлення на замовлення</div>
                        </div>
                        <div className="order-icon">
                            <img src={mindIcon} alt="Experience" />
                            <div>9 років досвіду</div>
                        </div>
                    </div>
                    <div className="order-block-button-container">
                        <a href="./communication_page.html"><button>Замовити</button></a>
                    </div>
                </div>
            </div>
            <div className="footer-footer">
                <div className="footer-footer-text-block">
                    <div className="footer-footer-logo">
                        <div className="heading">POLISSYA GRANITE</div>
                        <div className="text">Ваш персональний майстер каменю. Зв'яжіться з нами і ми допоможемо Вам підібрати виріб з каменю індивідуально</div>
                    </div>
                    <div className="footer-footer-links">
                        <div className="heading">Соціальні</div>
                        <div className="link"><a href="https://www.instagram.com/polissya.granite/?igshid=OGQ5ZDc2ODk2ZA%3D%3D">Instagram</a></div>
                        <div className="link"><a href="https://www.facebook.com/polissya.granite">Facebook</a></div>
                        <div className="link"><a href="https://www.tiktok.com/@polissya.granite">Tik tok</a></div>
                    </div>
                </div>
                <div className="footer-footer-footer">
                    <div>©2017 POLISSYAGRANITE. Всі права захищені</div>
                    <div className="cursor-pointer">Політика конфіденційності</div>
                    <div className="cursor-pointer">Правила та умови</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;