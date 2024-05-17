import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../assets/css/custom_confirm.css";

const CustomConfirm = ({ message, onConfirm, onCancel }) => {
  return confirmAlert({
    customUI: ({ onClose }) => (
      <div className='custom-confirm'>
        <h1>Confirm</h1>
        <p>{message}</p>
        <div className="buttons">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn-primary"
          >
            Yes
          </button>
          <button
            onClick={() => {
              onCancel();
              onClose();
            }}
            className="btn-primary"
          >
            No
          </button>
        </div>
      </div>
    ),
  });
};

export default CustomConfirm;