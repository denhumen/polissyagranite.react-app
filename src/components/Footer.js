import React from 'react';
import earthIcon from '../assets/img/earth-svg.svg';
import moneyIcon from '../assets/img/money-svg.svg';
import instrumentsIcon from '../assets/img/instruments-svg.svg';
import mindIcon from '../assets/img/mind-svg.svg';
import "../assets/css/footer.css"
import footerBg from '../assets/img/footer_bg.jpg';
import { useTranslation } from 'react-i18next';

function Footer() {
    const [t, i18n] = useTranslation("global");

    return (
        <div className="footer">
            <div className="order-block" style={{ backgroundImage: `url(${footerBg})`}}>
                <div className="order-container">
                    <div className="text1">{t("footer.title")}</div>
                    <div className="text2">
                        {t("footer.description")}
                    </div>
                    <div className="order-block-icons">
                        <div className="order-icon">
                            <img src={earthIcon} alt="Worldwide Shipping" />
                            <div>{t("footer.list1")}</div>
                        </div>
                        <div className="order-icon">
                            <img src={moneyIcon} alt="Individual Prices" />
                            <div>{t("footer.list2")}</div>
                        </div>
                        <div className="order-icon">
                            <img src={instrumentsIcon} alt="Custom Orders" />
                            <div>{t("footer.list3")}</div>
                        </div>
                        <div className="order-icon">
                            <img src={mindIcon} alt="Experience" />
                            <div>{t("footer.list4")}</div>
                        </div>
                    </div>
                    <div className="order-block-button-container">
                        <a href="./communication_page.html"><button>{t("footer.button_name")}</button></a>
                    </div>
                </div>
            </div>
            <div className="footer-footer">
                <div className="footer-footer-text-block">
                    <div className="footer-footer-logo">
                        <div className="heading">POLISSYA GRANITE</div>
                        <div className="text">{t("footer.company_description")}</div>
                    </div>
                    <div className="footer-footer-links">
                        <div className="heading">{t("footer.socials")}</div>
                        <div className="link"><a href="https://www.instagram.com/polissya.granite/?igshid=OGQ5ZDc2ODk2ZA%3D%3D">Instagram</a></div>
                        <div className="link"><a href="https://www.facebook.com/polissya.granite">Facebook</a></div>
                        <div className="link"><a href="https://www.tiktok.com/@polissya.granite">Tik tok</a></div>
                    </div>
                </div>
                <div className="footer-footer-footer">
                    <div>{t("footer.rules")}</div>
                    <div className="cursor-pointer">{t("footer.privacy")}</div>
                    <div className="cursor-pointer">{t("footer.terms")}</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;