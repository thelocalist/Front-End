import React, { useRef, useEffect, useState } from 'react';

import classnames from 'classnames';

import classes from './styles.module.scss';

export default function StoryPopup({ setIsStoryPopupVisible, story }) {
  const [authorPhotoTopPosition, setAuthorPhotoTopPosition] = useState(0);
  const [authorPhotoWidth, setAuthorPhotoWidth] = useState(0);
  const [textScrollPosition, setTextScrollPosition] = useState(0);
  const [isOneColumnLayout, setIsOneColumnLayout] = useState(false);

  const authorPhotoContainer = useRef();
  const contentRef = useRef();
  const storyPopupRef = useRef();
  const testBoxRef = useRef();

  const authorImage = story.authorImagePath.replace(/\\/g, '/');
  const headerImage = story.headerImagePath.replace(/\\/g, '/');

  const resizeAuthorPhoto = () => {
    setAuthorPhotoWidth(authorPhotoContainer.current.clientHeight * 1.35);
    setAuthorPhotoTopPosition(
      (-authorPhotoContainer.current.clientHeight * 1.35) / 1.9 - 12
    );
  };

  const switchTextLayout = () => {
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
    switchTextLayout();
    resizeAuthorPhoto();
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

  return (
    <div
      className={classes.StoryPopup}
      ref={storyPopupRef}
      style={{ columns: isOneColumnLayout ? '1' : '2' }}
    >
      <div
        className={classes.testBox}
        dangerouslySetInnerHTML={{ __html: story.content }}
        ref={testBoxRef}
      />
      <i className={classes.closePopupIcon} onClick={hidePopup}>
        Close
      </i>
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
                  top: authorPhotoTopPosition,
                  width: authorPhotoWidth,
                  backgroundImage: `url(${process.env.REACT_APP_STATIC_URL}/${authorImage})`,
                }}
              />
              <span>{story.authorName}</span>
            </div>
            <div className={classes.title}>
              <h1>{story.title}</h1>
              <div className={classes.titleFooter}>
                <i className={classes.share}>Share</i>
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
            <span className={classes.button}>
              <span className={classes.buttonTitle}>Share</span>
              <i className={classes.share}>Share</i>
            </span>
          </div>
        )}
      </div>
      <div className={classes.footer}>
        {!isOneColumnLayout ? (
          <div className={classes.switchPageButtons}>
            <i className={classes.prevPage} onClick={() => switchPage('back')}>
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
          <div className={classnames(classes.shareButtonBlock, classes.bottom)}>
            <span className={classes.button}>
              <span className={classes.buttonTitle}>Share</span>
              <i className={classes.share}>Share</i>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
