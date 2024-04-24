import React, { useState } from 'react';
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

function MainPage(){
    const [url, setUrl] = useState('');

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

            <Carousel images={[image0, image1]} />
            <Catalog />
            <Footer />
        </div>
    );
}

export default MainPage;