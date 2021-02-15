import React from 'react';

import Modal from 'react-bootstrap/Modal';
import '../../assets/bootstrap-modal.css';

/* import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share'; */

import classes from './styles.module.scss';

export default function ShareButtonsPopup({ show, onHide }) {
  /* const shareUrl = 'http://example.com/';
  const title = 'GitHub'; */
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
        <p>Buttons to be here</p>
      </Modal.Body>
      <Modal.Footer className={classes.footer}>
        <button className={classes.button} type="button" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
