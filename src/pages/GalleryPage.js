import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { get_gallery, get_title_by_slider } from '../firebase-communication/firebase-database';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

function GalleryPage() {
    const [t, i18n] = useTranslation("global");
    const lang = i18n.language;

    const { parentSliderId, sliderId } = useParams();
    const [title, setTitle] = useState({});
    
    const { user } = useAuth();
    const isAdmin = !!user;

    const [gallery, setGallery] = useState([]);

    const fetchGallery = async () => {
        const loadedGallery = await get_gallery(parentSliderId, sliderId);
        setGallery(loadedGallery);
    };

    useEffect(() => {
        fetchGallery();
    }, [parentSliderId, sliderId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        const fetchTitle = async () => {
            const fetchedTitle = await get_title_by_slider(parentSliderId, sliderId);
            setTitle(fetchedTitle);
        };

        fetchTitle();
    }, []);

    return (
        <div>
            <Header isAdmin={isAdmin} />

            <div className='main-name'>{title[lang]}</div>
            
            <Gallery images={gallery} isAdmin={isAdmin} parentSliderId={parentSliderId} sliderId={sliderId} reloadData={fetchGallery} />
            <Footer />
        </div>
    );
}

export default GalleryPage;
