import React, { useRef, useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

import classnames from 'classnames';

import ShareButtonsPopup from '../../modals/ShareButtonsModal';
import classes from './styles.module.scss';

export default function StoryPopup({ setIsStoryPopupVisible, story, error }) {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const [authorPhotoTopPosition, setAuthorPhotoTopPosition] = useState(0);
  const [authorPhotoWidth, setAuthorPhotoWidth] = useState(0);
  const [textScrollPosition, setTextScrollPosition] = useState(0);
  const [isOneColumnLayout, setIsOneColumnLayout] = useState(false);
  const [isShareButtonsPopupVisible, setIsShareButtonsPopupVisible] = useState(
    false
  );

  const authorPhotoContainer = useRef();
  const contentRef = useRef();
  const storyPopupRef = useRef();
  const testBoxRef = useRef();

  const authorImage = story ? story.authorImagePath.replace(/\\/g, '/') : null;
  const headerImage = story ? story.headerImagePath.replace(/\\/g, '/') : null;

  const resizeAuthorPhoto = () => {
    if (isMobile || !story) {
      return;
    }
    setAuthorPhotoWidth(authorPhotoContainer.current.clientHeight * 1.35);
    setAuthorPhotoTopPosition(
      (-authorPhotoContainer.current.clientHeight * 1.35) / 1.9 - 12
    );
  };

  const switchTextLayout = () => {
    if (isMobile || !story) {
      setIsOneColumnLayout(true);
      return;
    }
    if (
      testBoxRef.current.scrollHeight * 2 + 120 >
      contentRef.current.scrollHeight
    ) {
      setIsOneColumnLayout(false);
    } else {
      setIsOneColumnLayout(true);
    }
  };

  useEffect(() => {
    resizeAuthorPhoto();
    switchTextLayout();
    window.addEventListener('resize', resizeAuthorPhoto);
    window.addEventListener('resize', switchTextLayout);
    return () => {
      window.removeEventListener('resize', resizeAuthorPhoto);
      window.removeEventListener('resize', switchTextLayout);
    };
  }, []);

  const hidePopup = () => {
    setIsStoryPopupVisible(false);
  };

  const switchPage = (direction) => {
    if (direction === 'forward') {
      if (
        textScrollPosition - contentRef.current.clientWidth * 2 - 32 <
        -contentRef.current.offsetWidth
      ) {
        setTextScrollPosition(0);
        return;
      }
      setTextScrollPosition(
        (prevPosition) => prevPosition - contentRef.current.clientWidth * 2 - 32
      );
    } else if (direction === 'back') {
      if (textScrollPosition === 0) {
        return;
      }
      setTextScrollPosition(
        (prevPosition) => prevPosition + contentRef.current.clientWidth * 2 + 32
      );
    }
  };

  const hideShareButtonsPopup = () => {
    setIsShareButtonsPopupVisible(false);
  };

  return (
    <div
      className={classes.StoryPopup}
      ref={storyPopupRef}
      style={{ columns: isOneColumnLayout ? '1' : '2' }}
    >
      {!isMobile && story && (
        <div
          className={classes.testBox}
          dangerouslySetInnerHTML={{ __html: story.content }}
          ref={testBoxRef}
        />
      )}
      <i className={classes.closePopupIcon} onClick={hidePopup}>
        Close
      </i>
      {story ? (
        <div
          className={classes.content}
          style={{ left: textScrollPosition }}
          ref={contentRef}
        >
          <div
            className={classes.header}
            style={{
              backgroundImage: `url(${process.env.REACT_APP_STATIC_URL}/${headerImage})`,
            }}
          >
            <div className={classes.heading}>
              <div className={classes.author} ref={authorPhotoContainer}>
                <div
                  className={classes.authorPhoto}
                  style={{
                    top: !isMobile ? authorPhotoTopPosition : '',
                    width: !isMobile ? authorPhotoWidth : '',
                    backgroundImage: `url(${process.env.REACT_APP_STATIC_URL}/${authorImage})`,
                  }}
                />
                <span>{story.authorName}</span>
              </div>
              <div className={classes.title}>
                <h1>{story.title}</h1>
                <div className={classes.titleFooter}>
                  <i
                    className={classes.share}
                    onClick={() => {
                      setIsShareButtonsPopupVisible(true);
                    }}
                  >
                    Share
                  </i>
                  <i className={classes.views}>Views count</i>
                  <span>1202</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={classes.text}
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
          {!isOneColumnLayout && (
            <div className={classes.shareButtonBlock}>
              <span
                className={classes.button}
                onClick={() => setIsShareButtonsPopupVisible(true)}
              >
                <span className={classes.buttonTitle}>Share</span>
                <i className={classes.share}>Share</i>
              </span>
            </div>
          )}
        </div>
      ) : null}
      {story ? (
        <div className={classes.footer}>
          {!isOneColumnLayout ? (
            <div className={classes.switchPageButtons}>
              <i
                className={classes.prevPage}
                onClick={() => switchPage('back')}
              >
                Previous Page
              </i>
              <i
                className={classes.nextPage}
                onClick={() => switchPage('forward')}
              >
                Next Page
              </i>
            </div>
          ) : (
            <div
              className={classnames(classes.shareButtonBlock, classes.bottom)}
            >
              <span
                className={classes.button}
                onClick={() => {
                  setIsShareButtonsPopupVisible(true);
                }}
              >
                <span className={classes.buttonTitle}>Share</span>
                <i className={classes.share}>Share</i>
              </span>
            </div>
          )}
          <ShareButtonsPopup
            show={isShareButtonsPopupVisible}
            onHide={hideShareButtonsPopup}
          />
        </div>
      ) : (
        <div className={classes.noStory}>
          {error ? <p>{error.message}</p> : <p>Nothing found</p>}
        </div>
      )}
    </div>
  );
}
