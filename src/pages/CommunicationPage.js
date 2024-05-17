import React from 'react';
import '../assets/css/communication.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

import whatsappIcon from "../assets/img/whatsapp-icon.svg";
import facebookIcon from "../assets/img/facebook-icon.svg";
import instagramIcon from "../assets/img/instagram-icon.svg";
import tiktokIcon from "../assets/img/tiktok-icon.svg";
import { useAuth } from '../context/AuthContext';

function CommunicationPage() {
    const [t, i18n] = useTranslation("global");
    const { user } = useAuth();
    const isAdmin = !!user;

    return (
        <div>
            <Header isAdmin={isAdmin}/>
            <div className="communication-information">
                <div className="text">{t('communication.title')}</div>
                <div className="company-contact-group">
                    <div className="company-contact">{t('communication.phone1')}</div>
                    <div className="company-contact">{t('communication.phone2')}</div>
                    <div className="company-contact">{t('communication.email')}</div>
                </div>
                <div className="icon-group-messangers">
                    <div className="item-container">
                        <a href="https://wa.me/+48730634203">
                            <img src={whatsappIcon} alt="WhatsApp" className="icon" />
                        </a>
                    </div>
                </div>
                <div className="icon-group-header">{t('communication.socials')}</div>
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
