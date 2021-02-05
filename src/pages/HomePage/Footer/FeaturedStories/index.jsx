import React, { useState, useEffect } from 'react';

import axios from 'axios';
import classnames from 'classnames';

import SearchResultsItem from '../../../../components/Search/SearchResultsPopup/SearchResultsItem';
import Spinner from '../../../../components/Spinner';
import classes from './styles.module.scss';

export default function FeaturedStories({
  featuredStoriesPosition,
  featuredStoriesRef,
  isVisible,
}) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/stories`, {
        params: { isFeatured: true },
      })
      .then((response) => {
        console.log(response.data.data);
        setStories(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      className={
        isVisible
          ? classnames(classes.FeaturedStories, classes.visible)
          : classes.FeaturedStories
      }
      style={{ left: featuredStoriesPosition }}
      ref={featuredStoriesRef}
    >
      {stories.length ? (
        stories.map((story) => (
          <SearchResultsItem
            key={story.id}
            searchResult={story}
            styles={{
              minWidth: 305,
              maxWidth: 305,
              height: 250,
              marginRight: 15,
            }}
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