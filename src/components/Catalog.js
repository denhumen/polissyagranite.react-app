import React from 'react';
import photo1 from '../assets/img/earth-svg.svg';
const Katalog = () => {
    // Sample data for the catalog
    const catalogData = [
        { id: 1, image: photo1, caption: 'Item 1' },
        { id: 2, image: photo1, caption: 'Item 2' },
        { id: 3, image: photo1, caption: 'Item 3' },
        { id: 1, image: photo1, caption: 'Item 1' },
        { id: 2, image: photo1, caption: 'Item 2' },
        { id: 3, image: photo1, caption: 'Item 3' },
        { id: 1, image: photo1, caption: 'Item 1' },
        { id: 2, image: photo1, caption: 'Item 2' },
        { id: 3, image: photo1, caption: 'Item 3' },
        { id: 1, image: photo1, caption: 'Item 1' },
        { id: 2, image: photo1, caption: 'Item 2' },
        { id: 3, image: photo1, caption: 'Item 3' },
    ];

    return (
        <div style={{ margin: '10%', display: 'flex', flexWrap: 'wrap', gap : '10 20', justifyContent:"center"}}>
            {catalogData.map((item) => (
                <div key={item.id} style={{ width: '18%', padding: '10px' }}>
                    <img src={item.image} alt={item.caption} style={{ width: '100%' }} />
                    <p style={{ textAlign: 'center' }}>{item.caption}</p>
                </div>
            ))}
        </div>
    );
};

export default Katalog;
