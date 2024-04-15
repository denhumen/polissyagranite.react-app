import React from 'react';
import "../assets/css/main_block.css"
import mainblockBg from "../assets/img/main_bg.jpg"
import Header from './Header';
import Carousel from './Carousel';
import { useTranslation } from 'react-i18next';


const images1 = [
    "https://via.placeholder.com/800x400?text=Image1",
    "https://via.placeholder.com/800x400?text=Image2",
    "https://via.placeholder.com/800x400?text=Image3",
    "https://via.placeholder.com/800x400?text=Image4",
];

const images2 = [
    "https://via.placeholder.com/800x400?text=Image5",
    "https://via.placeholder.com/800x400?text=Image6",
    "https://via.placeholder.com/800x400?text=Image7",
    "https://via.placeholder.com/800x400?text=Image8",
];

const images3 = [
    "https://via.placeholder.com/800x400?text=Image9",
    "https://via.placeholder.com/800x400?text=Image10",
    "https://via.placeholder.com/800x400?text=Image11",
    "https://via.placeholder.com/800x400?text=Image12",
    "https://via.placeholder.com/800x400?text=Image13",
];

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
            <Carousel images={images1} />
            <Carousel images={images2} />
            <Carousel images={images3} />
        </div>
    );
}

export default Main;