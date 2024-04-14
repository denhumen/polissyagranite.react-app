import React from 'react';
import "../assets/css/main_block.css"
import mainblockBg from "../assets/img/main_bg.jpg"
import Header from './Header';
import { useTranslation } from 'react-i18next';

function Main() {
    const [t, i18n] = useTranslation("global");

    return (
        <div>
            <Header />
            <div className="main-block" style={{backgroundImage: `url(${mainblockBg})`}}>
                <div className="main-block-text-block">
                    {/* <div class="text1">100% Гарантія Якості</div> */}
                    <div className="text2">{t("main.motto")}</div>
                    <div className="text3">{t("main.description")}</div>
                </div>
            </div>
        </div>
    );
}

export default Main;