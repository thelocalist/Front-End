import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';

import SearchResultsItem from '../../../../components/Search/SearchResultsPopup/SearchResultsItem';
import Spinner from '../../../../components/Spinner';
import { API_URL } from '../../../../constants/main';
import classes from './styles.module.scss';

export default function FeaturedStories({
  featuredStoriesPosition,
  featuredStoriesRef,
  isVisible,
}) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/stories`, {
        params: { isFeatured: true },
      })
      .then((response) => {
        setStories(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      className={classnames(
        classes.FeaturedStories,
        isVisible && classes.visible
      )}
      style={{ left: featuredStoriesPosition }}
      ref={featuredStoriesRef}
    >
      {stories.length ? (
        stories.map((story) => (
          <SearchResultsItem
            key={story.id}
            searchResult={story}
            className={classes.searchItem}
          />
        ))
      ) : (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
