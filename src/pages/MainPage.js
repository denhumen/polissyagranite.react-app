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

    const handleFileUpload = async (e) => {
        try {
            const url = await uploadImage(e);
            setUrl(url);
            console.log('Uploaded image URL:', url);
        } catch (error) {
            setUrl('');
            console.error('Error uploading image:', error);
        }
    };

    const handleDeleteImage = async () => {
        if (!url) {
            alert('No image URL available to delete');
            return;
        }

        try {
            await deleteImage(url);
            setUrl('');
            console.log('Image deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const testUrl = "http://example.com/new-image.jpg";

    const titles = {
        en: "New Slider",
        ua: "Новий слайдер",
        pl: "Nowy suwak"
    };

    const descriptions = {
        en: "New slider description in English",
        ua: "Опис нового слайдера українською",
        pl: "Opis nowego suwaka po polsku"
    };

    const slideData = [
        {
          image: "https://firebasestorage.googleapis.com/v0/b/polissya-granite.appspot.com/o/main_pavement.png?alt=media&token=daab0c38-4662-4505-82e5-55d3597f0f70",
          title: "Slide 1 Title",
          description: "Description for Slide 1",
          button1Text: "Button 1",
          button2Text: "Button 2"
        },
        {
          image: "https://firebasestorage.googleapis.com/v0/b/polissya-granite.appspot.com/o/%D0%B3%D0%B0%D0%BB%D1%82%D0%BE%D0%B2%D0%B0%D0%BD%D0%B0_1.png?alt=media&token=696bbb2a-d8c0-4594-8ff6-5192e4ac4e79",
          title: "Slide 2 Title",
          description: "Description for Slide 2",
          button1Text: "Button 3",
          button2Text: "Button 4"
        },
        // Add more slides as needed
      ];

    return (
        <div>
            <Main />

            <input type="file" onChange={(e) => handleFileUpload(e)}/>
            {url && (
                <div>
                    <img src={url} alt="Uploaded" style={{ width: '100px', height: 'auto' }} />
                    <button onClick={handleDeleteImage}>Delete Image</button>
                </div>
            )}

            <button onClick={() => add_new_slider(2, testUrl, titles, descriptions)}> Add new slider </button>

            {sliderGroups.map(group => (
                <Carousel slides={group["sliders"]} isAdmin={true} />
            ))};

            <Catalog isAdmin={true}/>
            <Footer />
        </div>
    );
}

export default MainPage;
