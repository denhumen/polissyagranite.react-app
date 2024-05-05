import {React, useState} from 'react';
import photo1 from '../assets/img/earth-svg.svg';
import AddImageModal from './AddImageModalfromCar';

const Catalog = (isAdmin) => {
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

    const style = {
        width: '50%',
        height: '40%',
        borderRadius: '50%',
        backgroundColor: '#1B3544',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px',
        marginBottom: '70px',
        cursor: 'pointer'
    };
    const style1 = {
        width: '18%',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const buttuonStyle = {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '64px',
        cursor: 'pointer'
        };

    const [AddImage, setImage] = useState(false);

    const handleAddClick = () => {
        setImage(true)
    };

    return (

        <div style={{ margin: '10%', display: 'flex', flexWrap: 'wrap', gap : '10 20', justifyContent:"center"}}>
             <AddImageModal modalIsOpen={AddImage} setModalIsOpen={setImage}  />

            {catalogData.map((item) => (
                <div key={item.id} style={{ width: '18%', padding: '10px' }}>
                    <img src={item.image} alt={item.caption} style={{ width: '100%' }} />
                    <p style={{ textAlign: 'center' }}>{item.caption}</p>
                </div>
            ))}

            {isAdmin && (
                <div style={style1}>
                    <div style={style} onClick={handleAddClick}>
                        <button style={buttuonStyle}>+</button>
                    </div>
                </div>
            )}

            {AddImage && <AddImageModal modalIsOpen={AddImage} setModalIsOpen={setImage}  />}


        </div>

    );
};

export default Catalog;
