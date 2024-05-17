import React from 'react';
import "../assets/css/main_block.css"
import mainblockBg from "../assets/img/main_bg.jpg"
import Header from './Header';
import Carousel from './Carousel';
import { useTranslation } from 'react-i18next';
import Katalog from './Catalog';

function Main({isAdmin}) {
    const [t, i18n] = useTranslation("global");

    return (
        <div>
            <Header isAdmin={isAdmin} />
            <div className="main-block" style={{backgroundImage: `url(${mainblockBg})`}}>
                <div className="main-block-text-block">
                    <div className="text2">{t("main.motto")}</div>
                    <div className="text3">{t("main.description")}</div>
                </div>
            </div>
        </div>
    );
}

export default Main;