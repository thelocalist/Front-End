import React from 'react';

import Modal from 'react-bootstrap/Modal';

import '../../assets/bootstrap-modal.css';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import ReactCopyToClipboardUI from 'react-copy-to-clipboard-ui';

import classes from './styles.module.scss';

export default function ShareButtonsPopup({ show, onHide, title, shareUrl }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={classes.ShareButtonsPopup}
    >
      <Modal.Header className={classes.header}>
        <Modal.Title className={classes.title}>Share story</Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.body}>
        <div className={classes.buttons}>
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={38} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={38} round />
          </TwitterShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body={title}
            className="Demo__some-network__share-button"
          >
            <EmailIcon size={38} round />
          </EmailShareButton>
        </div>
      </Modal.Body>
      <Modal.Footer className={classes.footer}>
        <div className={classes.copyLink}>
          <span>Link to story: </span>
          <ReactCopyToClipboardUI
            btnStyle={{ backgroundColor: 'white', paddingBottom: '6px' }}
          >
            {shareUrl}
          </ReactCopyToClipboardUI>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
