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
import { add_new_slider, get_sliders } from '../firebase-communication/firebase-database';



import { rtDatabase } from "../firebase-config";
import { ref, get, update, push, set, onValue, child } from "firebase/database";
import CarouselGroup from '../components/CarouselGroup';

function MainPage(){
    const [url, setUrl] = useState('');
    const [sliderGroups, setSliderGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const loadedSliderGroups = await get_sliders();
            setSliderGroups(loadedSliderGroups);
        };
        fetchData();
    }, []);

    return (
        <div>
            <Main />
            
            <CarouselGroup slidersGroups={sliderGroups} isAdmin={true}/>

            <Catalog />

            <Footer />
        </div>
    );
}

export default MainPage;