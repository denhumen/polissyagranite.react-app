import React, { useState } from 'react';
import AddStoneModal from './AddStoneModal';
import '../assets/css/catalog.css';
import CatalogItem from './CatalogItem';

const Catalog = ({ catalogData, isAdmin, refreshCatalog }) => {
  const [addImage, setAddImage] = useState(false);

  const handleAddClick = () => {
    setAddImage(true);
  };

  return (
    <div className="catalogContainer">
      <AddStoneModal modalIsOpen={addImage} setModalIsOpen={setAddImage} reloadData={refreshCatalog} />

      {catalogData.map((item) => (
        <CatalogItem
          key={item.id}
          item={item}
          isAdmin={isAdmin}
          refreshCatalog={refreshCatalog}
        />
      ))}

      {isAdmin && (
        <div className="addButtonWrapper">
          <div className="addButtonContainer" onClick={handleAddClick}>
            <button className="addButton">+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;