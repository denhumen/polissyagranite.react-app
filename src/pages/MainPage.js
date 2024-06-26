import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Main from '../components/Main';
import { useAuth } from '../context/AuthContext';
import CarouselGroup from '../components/CarouselGroup';
import Catalog from '../components/Catalog';
import { get_sliders, get_stone_gallery } from '../firebase-communication/firebase-database';
import SectionHeading from '../components/SectionHeading';
import { useTranslation } from 'react-i18next';

function MainPage() {
    const [t, i18n] = useTranslation("global");

    const { user } = useAuth();
    const isAdmin = !!user;

    const [sliderGroups, setSliderGroups] = useState([]);
    const [stoneGallery, setStoneGallery] = useState([]);

    const fetchSliderGroups = async () => {
        const loadedSliderGroups = await get_sliders();
        setSliderGroups(loadedSliderGroups);
    };

    const fetchStoneGallery = async () => {
        const loadedStoneGallery = await get_stone_gallery();
        setStoneGallery(loadedStoneGallery);
    };

    useEffect(() => {
        fetchSliderGroups();
        fetchStoneGallery();
    }, []);

    return (
        <div>
            <Main isAdmin={isAdmin} />

            <SectionHeading>{t('sectionHeadings.products')}</SectionHeading>

            <CarouselGroup
                slidersGroups={sliderGroups}
                isAdmin={isAdmin}
                refreshSliderGroups={fetchSliderGroups}
            />

            <SectionHeading>{t('sectionHeadings.stones')}</SectionHeading>

            <Catalog 
                catalogData={stoneGallery} 
                isAdmin={isAdmin}
                refreshCatalog={fetchStoneGallery} />
            <Footer />
        </div>
    );
}

export default MainPage;
