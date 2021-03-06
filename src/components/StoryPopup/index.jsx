import React, { useRef, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import MetaTags from 'react-meta-tags';
import classnames from 'classnames';

import ShareButtonsPopup from '../../modals/ShareButtonsModal';
import classes from './styles.module.scss';
import { STATIC_URL, URL } from '../../constants/main';

export default function StoryPopup({
  setIsStoryPopupVisible,
  story,
  error,
  history,
}) {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  // const [authorPhotoTopPosition, setAuthorPhotoTopPosition] = useState(0);
  const [authorPhotoWidth, setAuthorPhotoWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(null);
  const [isShareButtonsPopupVisible, setIsShareButtonsPopupVisible] = useState(
    false
  );
  // Fix Chrome positioning bug
  const [headingBottomPosition, setHeadingBottomPosition] = useState(1);

  const authorPhotoContainer = useRef();
  const authorPhotoRef = useRef();
  const contentRef = useRef();
  const storyPopupRef = useRef();
  const textContentRef = useRef();
  const headingContainer = useRef();

  const authorImage = story ? story.authorImagePath.replace(/\\/g, '/') : null;
  const headerImage = story ? story.headerImagePath.replace(/\\/g, '/') : null;
  const storyDescription = story
    ? `${story.content.replace(/(<([^>]+)>)/gi, '').substring(0, 112)}...`
    : null;

  const location = useLocation();

  const resizeHeader = () => {
    if (!story) {
      return;
    }

    setAuthorPhotoWidth(authorPhotoContainer.current.clientWidth * 0.65);

    /* setTimeout(() => {
      if (authorPhotoRef) {
        setAuthorPhotoTopPosition(
          -authorPhotoRef.current.clientHeight / 2 -
            authorPhotoRef.current.clientHeight * 0.1
        );
      }
    }, 0); */
  };

  const calculatePagesCount = () => {
    if (isMobile) {
      return;
    }
    if (textContentRef.current.offsetWidth === contentRef.current.clientWidth) {
      setPagesCount(
        Math.floor(
          (textContentRef.current.scrollHeight + 280) /
            (contentRef.current.offsetHeight * 2 + 32)
        )
      );
    } else {
      setPagesCount(
        Math.floor(
          contentRef.current.offsetWidth /
            (contentRef.current.clientWidth * 2 + 32)
        )
      );
    }
  };

  const fixChromePositioningBug = () => {
    setTimeout(() => {
      setHeadingBottomPosition((prevState) => {
        if (prevState === 0) {
          return 1;
        }
        return prevState;
      });
      setHeadingBottomPosition(0);
    }, 90);
  };

  useEffect(() => {
    fixChromePositioningBug();

    resizeHeader();
    window.addEventListener('resize', resizeHeader);
    window.addEventListener('resize', fixChromePositioningBug);
    window.addEventListener('resize', calculatePagesCount);
    return () => {
      window.removeEventListener('resize', resizeHeader);
      window.removeEventListener('resize', fixChromePositioningBug);
      window.removeEventListener('resize', calculatePagesCount);
    };
  }, []);

  useEffect(calculatePagesCount, []);

  const hidePopup = () => {
    setIsStoryPopupVisible(false);
    if (
      (location.state && location.state.from === '/search') ||
      (location.state && location.state.from.includes('community'))
    ) {
      history.goBack();
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    if (!location.pathname.includes('/story/')) {
      hidePopup();
    }
  }, [location]);

  const switchPage = (direction) => {
    if (direction === 'forward') {
      if (currentPage === pagesCount) {
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

  const hideShareButtonsPopup = () => {
    setIsShareButtonsPopupVisible(false);
  };

  console.log({ pagesCount });

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
      <i
        className={classes.closePopupIcon}
        onClick={hidePopup}
        preserveNeighborhoodSelection="true"
      >
        Close
      </i>
      {story ? (
        <div
          className={classes.content}
          style={{
            marginLeft:
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
            <div
              className={classes.heading}
              ref={headingContainer}
              style={{
                bottom: headingBottomPosition,
                visibility: headingBottomPosition !== 0 ? 'hidden' : 'visible',
              }}
            >
              <div
                className={classes.author}
                ref={authorPhotoContainer}
                style={{
                  height:
                    isMobile && headingContainer.current
                      ? headingContainer.current.clientHeight
                      : '',
                }}
              >
                <div
                  className={classes.authorPhoto}
                  ref={authorPhotoRef}
                  style={{
                    // top: authorPhotoTopPosition,
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
                  <span>{story.viewCount}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={classes.text}
            dangerouslySetInnerHTML={{ __html: story.content }}
            ref={textContentRef}
          />
          <div className={classes.shareButtonBlock}>
            <span
              className={classes.button}
              onClick={() => setIsShareButtonsPopupVisible(true)}
            >
              <span className={classes.buttonTitle}>Share</span>
              <i className={classes.share}>Share</i>
            </span>
          </div>
        </div>
      ) : null}
      {story ? (
        <div className={classes.footer}>
          {!isMobile && (
            <div className={classes.switchPageButtons}>
              <i
                className={classnames(
                  classes.prevPage,
                  currentPage === 0 && classes.disabled
                )}
                onClick={() => switchPage('back')}
              >
                Previous Page
              </i>
              <i
                className={classnames(
                  classes.nextPage,
                  currentPage === pagesCount && classes.disabled
                )}
                onClick={() => switchPage('forward')}
              >
                Next Page
              </i>
            </div>
          )}
          <ShareButtonsPopup
            show={isShareButtonsPopupVisible}
            onHide={hideShareButtonsPopup}
            title={story.title}
            shareUrl={`${window.location.hostname}/story/${story.id}`}
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
