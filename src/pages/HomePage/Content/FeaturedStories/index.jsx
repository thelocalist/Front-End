import React, { useEffect } from 'react';
import classnames from 'classnames';

import SearchResultsItem from '../../../../components/Search/SearchResultsPopup/SearchResultsItem';
import Spinner from '../../../../components/Spinner';
import ErrorMessage from '../../ErrorMessage';
import useApiRequest from '../../../../helpers/useApiRequest';
import classes from './styles.module.scss';

export default function FeaturedStories({
  featuredStoriesPosition,
  featuredStoriesRef,
  isVisible,
  showStory,
}) {
  // const [stories, setStories] = useState([]);

  const [
    stories,
    fetchStories,
    isStoriesFetching,
    storiesFetchingError,
  ] = useApiRequest('get', '/stories');

  useEffect(() => {
    fetchStories({ isFeatured: true });
    console.log(isStoriesFetching);
  }, []);

  return (
    <div
      className={classnames(
        classes.FeaturedStories,
        isVisible && classes.visible
      )}
      style={{ left: featuredStoriesPosition, zIndex: isVisible ? 1 : 0 }}
      ref={featuredStoriesRef}
    >
      {stories ? (
        stories.data.map((story) => (
          <SearchResultsItem
            showStory={showStory}
            key={story.id}
            searchResult={story}
            className={classes.searchItem}
            styles={{ marginLeft: 'auto' }}
          />
        ))
      ) : (
        <div className={classes.spinner}>
          {storiesFetchingError ? (
            <ErrorMessage message={storiesFetchingError.message} />
          ) : (
            <Spinner />
          )}
        </div>
      )}
    </div>
  );
}
