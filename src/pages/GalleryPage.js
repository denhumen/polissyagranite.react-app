import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { get_gallery } from '../firebase-communication/firebase-database';
import Gallery from '../components/Gallery';
import Header from '../components/Header';

function GalleryPage() {
    const { parentSliderId, sliderId } = useParams();
    
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

    return (
        <div>
            <Header isAdmin={isAdmin} />
            <Gallery images={gallery} isAdmin={isAdmin} parentSliderId={parentSliderId} sliderId={sliderId} reloadData={fetchGallery} />
            <Footer />
        </div>
    );
}

export default GalleryPage;
