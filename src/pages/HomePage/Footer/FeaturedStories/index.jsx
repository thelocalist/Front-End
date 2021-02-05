import React, { useState, useEffect } from 'react';

import axios from 'axios';

// import SearchResulstItem from '../../../../components/Search/SearchResultsPopup/SearchResultsItem';
import Spinner from '../../../../components/Spinner';
import classes from './styles.module.scss';

export default function FeaturedStories() {
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
    <div className={classes.FeaturedStories}>
      {stories.length ? (
        stories.map((story) => <p key={story.id}>{story.title}</p>)
      ) : (
        <Spinner />
      )}
    </div>
  );
}
