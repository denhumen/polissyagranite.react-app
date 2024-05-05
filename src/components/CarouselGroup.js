import React from 'react';
import Carousel from './Carousel';

const CarouselGroup = ({ slidersGroups, isAdmin, lang = 'en' }) => {

    return (
        <>
            {slidersGroups.map(group => (
                <Carousel slides={group} isAdmin={isAdmin} lang={lang} />
            ))};
            {isAdmin &&
                <Carousel slides={[]} isAdmin={isAdmin} lang={lang} />
            }
        </>
    );
};

export default CarouselGroup;