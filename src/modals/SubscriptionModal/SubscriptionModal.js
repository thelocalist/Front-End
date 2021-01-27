import React from 'react';
import Modal from 'react-bootstrap/Modal';

import classes from './SubscriptionModal.module.css';
import '../../assets/bootstrap-modal.css';

export default function SubscriptionModal({ show, onHide, message }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={classes.SubscriptionModal}
    >
      <Modal.Header closeButton className={classes.header} />
      <Modal.Body className={classes.body}>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer className={classes.footer}>
        <button className={classes.button} type="button" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
