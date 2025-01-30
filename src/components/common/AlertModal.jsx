import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AlertModal = ({ isOpen, onClose, title, onDelete }) => {
  if (!isOpen) return null; // If the modal is not open, don't render it.

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-black">{title}</h5> {/* Ensure title text is black */}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body text-black"> {/* Apply black text color */}
            <p>Are you sure you want to proceed?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
