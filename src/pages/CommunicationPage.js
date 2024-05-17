import React from 'react';
import '../assets/css/communication.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

import whatsappIcon from "../assets/img/whatsapp-icon.svg";
import facebookIcon from "../assets/img/facebook-icon.svg";
import instagramIcon from "../assets//img/instagram-icon.svg";
import tiktokIcon from "../assets/img/tiktok-icon.svg";

function CommunicationPage() {
    

    return (
        <div>
            <Header />
            <div className="communication-information">
                <div className="text">Комунікація</div>
                <div className="company-contact-group">
                    <div className="company-contact">Телефон 1: +38 093 185 66 04</div>
                    <div className="company-contact">Телефон 2: +48730634203</div>
                    <div className="company-contact">Email: polissyagraniteua@gmail.com</div>
                </div>
                <div className="icon-group-messangers">
                    <div className="item-container">
                        <a href="https://wa.me/+48730634203">
                            <img src={whatsappIcon} alt="WhatsApp" className="icon" />
                        </a>
                    </div>
                </div>
                <div className="icon-group-header">Соціальні мережі</div>
                <div className="icon-group-socials">
                    <div className="item-container">
                        <a href="https://www.facebook.com/polissya.granite">
                            <img src={facebookIcon} alt="Facebook" className="icon" />
                        </a>
                    </div>
                    <div className="item-container">
                        <a href="https://instagram.com/polissya.granite?igshid=OGQ5ZDc2ODk2ZA==">
                            <img src={instagramIcon} alt="Instagram" className="icon" />
                        </a>
                    </div>
                    <div className="item-container">
                        <a href="https://www.tiktok.com/@polissya.granite">
                            <img src={tiktokIcon} alt="TikTok" className="icon" />
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CommunicationPage;
