import React from 'react';
import Carousel from './Carousel';

const CarouselGroup = ({ slidersGroups, isAdmin, refreshSliderGroups }) => {
    return (
        <>
            {slidersGroups.map(group => (
                <Carousel key={group.id} slides={group} isAdmin={isAdmin} refreshSliderGroups={refreshSliderGroups} />
            ))}
            {isAdmin && (
                <Carousel slides={{ sliders: [] }} isAdmin={isAdmin} refreshSliderGroups={refreshSliderGroups} />
            )}
        </>
    );
};

export default CarouselGroup;
