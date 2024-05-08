import React from 'react';
import Carousel from './Carousel';

const CarouselGroup = ({ slidersGroups, isAdmin, lang = 'en' }) => {

    return (
        <>
            {slidersGroups.map(group => (
                <Carousel slides={group} isAdmin={isAdmin} />
            ))};
            {isAdmin &&
                <Carousel slides={[]} isAdmin={isAdmin} />
            }
        </>
    );
};

export default CarouselGroup;