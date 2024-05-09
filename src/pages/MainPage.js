import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Main from '../components/Main';
import Carousel from '../components/Carousel';
import image0 from "../assets/img/sliders/main_pavement.png"
import image1 from "../assets/img/sliders/пилена_1.png"
import image2 from "../assets/img/sliders/колота_1.png"
import image3 from "../assets/img/sliders/пиляно_колота_1.png"
import image4 from "../assets/img/sliders/галтована_1.png"
import image5 from "../assets/img/sliders/french-pavement-main.png"
import Catalog from '../components/Catalog';
import { uploadImage, deleteImage } from '../firebase-communication/firebase-storage';
import { add_new_slider, get_sliders, get_stone_gallery } from '../firebase-communication/firebase-database';
import { rtDatabase } from "../firebase-config";
import { ref, get, update, push, set, onValue, child } from "firebase/database";
import CarouselGroup from '../components/CarouselGroup';
import { useTranslation } from 'react-i18next';

function MainPage(){
    const [url, setUrl] = useState('');
    const [sliderGroups, setSliderGroups] = useState([]);
    const [stoneGallery, setStoneGallery] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const loadedSliderGroups = await get_sliders();
            setSliderGroups(loadedSliderGroups);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const loadedStoneGallery = await get_stone_gallery();
            setStoneGallery(loadedStoneGallery);
        };
        fetchData();
    }, []);

    const handleButtonClick = async () => {
        const stG = await get_stone_gallery();
        console.log(stG);
    }

    return (
        <div>
            <Main />
            
            <CarouselGroup slidersGroups={sliderGroups} isAdmin={true} />
        
            <Catalog catalogData={stoneGallery} isAdmin={true}/>
            
            <Footer />
        </div>
    );
}

export default MainPage;
