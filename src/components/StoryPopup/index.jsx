import React, { useRef, useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

// import classnames from 'classnames';
import MetaTags from 'react-meta-tags';

import ShareButtonsPopup from '../../modals/ShareButtonsModal';
import classes from './styles.module.scss';
import { STATIC_URL, URL } from '../../constants/main';

export default function StoryPopup({ setIsStoryPopupVisible, story, error }) {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const [authorPhotoTopPosition, setAuthorPhotoTopPosition] = useState(0);
  const [authorPhotoWidth, setAuthorPhotoWidth] = useState(0);
  // const [textScrollPosition, setTextScrollPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  // const [isOneColumnLayout, setIsOneColumnLayout] = useState(false);
  const [isShareButtonsPopupVisible, setIsShareButtonsPopupVisible] = useState(
    false
  );

  const authorPhotoContainer = useRef();
  const contentRef = useRef();
  const storyPopupRef = useRef();
  const textContentRef = useRef();
  // const testBoxRef = useRef();

  const authorImage = story ? story.authorImagePath.replace(/\\/g, '/') : null;
  const headerImage = story ? story.headerImagePath.replace(/\\/g, '/') : null;
  const storyDescription = story
    ? `${story.content.replace(/(<([^>]+)>)/gi, '').substring(0, 112)}...`
    : null;

  const resizeAuthorPhoto = () => {
    if (isMobile || !story) {
      return;
    }
    setAuthorPhotoWidth(authorPhotoContainer.current.clientHeight * 1.35);
    setAuthorPhotoTopPosition(
      (-authorPhotoContainer.current.clientHeight * 1.35) / 1.9 - 12
    );
  };

  /* const switchTextLayout = () => {
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
  }; */

  useEffect(() => {
    resizeAuthorPhoto();
    // switchTextLayout();
    window.addEventListener('resize', resizeAuthorPhoto);
    // window.addEventListener('resize', switchTextLayout);
    return () => {
      window.removeEventListener('resize', resizeAuthorPhoto);
      // window.removeEventListener('resize', switchTextLayout);
    };
  }, []);

  const hidePopup = () => {
    setIsStoryPopupVisible(false);
  };

  const switchPageChrome = (direction) => {
    if (direction === 'forward') {
      if (
        currentPage ===
        Math.floor(
          textContentRef.current.scrollHeight /
            (contentRef.current.offsetHeight * 2 + 32)
        )
      ) {
        setCurrentPage(0);
        return;
      }
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === 'back') {
      if (currentPage === 0) {
        return;
      }
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const switchPageFirefox = (direction) => {
    if (direction === 'forward') {
      if (
        currentPage ===
        Math.floor(
          contentRef.current.offsetWidth /
            (contentRef.current.clientWidth * 2 + 32)
        )
      ) {
        setCurrentPage(0);
        return;
      }
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === 'back') {
      if (currentPage === 0) {
        return;
      }
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const switchPage = (direction) => {
    if (contentRef.current.offsetWidth > textContentRef.current.scrollHeight) {
      switchPageFirefox(direction);
    } else {
      switchPageChrome(direction);
    }
  };

  const hideShareButtonsPopup = () => {
    setIsShareButtonsPopupVisible(false);
  };

  return (
    <div className={classes.StoryPopup} ref={storyPopupRef}>
      {story && (
        <MetaTags>
          <title>{story.title}</title>
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${URL}/story/${story.id}`} />
          <meta property="og:image" content={`${STATIC_URL}${headerImage}`} />
          <meta property="og:site_name" content="The Localist" />
          <meta property="og:description" content={storyDescription} />
        </MetaTags>
      )}
      {/* {!isMobile && story && (
        <div
          className={classes.testBox}
          dangerouslySetInnerHTML={{ __html: story.content }}
          ref={testBoxRef}
        />
      )} */}
      <i className={classes.closePopupIcon} onClick={hidePopup}>
        Close
      </i>
      {story ? (
        <div
          className={classes.content}
          style={{
            left:
              contentRef.current &&
              (-contentRef.current.clientWidth * 2 - 32) * currentPage,
          }}
          ref={contentRef}
        >
          <div
            className={classes.header}
            style={{
              backgroundImage: `url(${STATIC_URL}${headerImage})`,
            }}
          >
            <div className={classes.heading}>
              <div className={classes.author} ref={authorPhotoContainer}>
                <div
                  className={classes.authorPhoto}
                  style={{
                    top: !isMobile ? authorPhotoTopPosition : '',
                    width: !isMobile ? authorPhotoWidth : '',
                    backgroundImage: `url(${STATIC_URL}${authorImage})`,
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
            ref={textContentRef}
          />
          {/* {!isOneColumnLayout && (
            <div className={classes.shareButtonBlock}>
              <span
                className={classes.button}
                onClick={() => setIsShareButtonsPopupVisible(true)}
              >
                <span className={classes.buttonTitle}>Share</span>
                <i className={classes.share}>Share</i>
              </span>
            </div>
          )} */}
        </div>
      ) : null}
      {story ? (
        <div className={classes.footer}>
          {/*  {!isOneColumnLayout ? (
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
          )} */}
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
          <ShareButtonsPopup
            show={isShareButtonsPopupVisible}
            onHide={hideShareButtonsPopup}
            title={story.title}
            shareUrl={`https://thelocalist.co/story/${story.id}`}
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
