import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';

import Spinner from '../../../../components/Spinner';
import SearchResultItem from '../../../../components/Search/SearchResultsPopup/SearchResultsItem';
import { API_URL } from '../../../../constants/main';
import classes from './styles.module.scss';

export default function RecentStories({
  recentStoriesRef,
  recentStoriesPosition,
  isVisible,
}) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/stories`, {
        params: { sortField: 'createdAt', sortOrder: 'desc' },
      })
      .then((response) => {
        setStories(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      className={
        isVisible
          ? classnames(classes.RecentStories, classes.visible)
          : classes.RecentStories
      }
      ref={recentStoriesRef}
      style={{ left: recentStoriesPosition }}
    >
      {stories.length ? (
        stories.map((story) => (
          <SearchResultItem
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
