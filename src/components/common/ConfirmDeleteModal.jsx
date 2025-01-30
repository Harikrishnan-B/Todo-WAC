

import React from 'react';
import { Modal, Button } from 'react-bootstrap';



export default function ConfirmDeleteModal({ show, onClose, onConfirm, title, message }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            console.log("Delete button clicked"); // Debug log
            onConfirm();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
