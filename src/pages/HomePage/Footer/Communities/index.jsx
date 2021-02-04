import React, { useEffect, useState } from 'react';

import axios from 'axios';

import SearchResultsPopup from '../../../../components/Search/SearchResultsPopup';
import Community from './Community';
import classes from './styles.module.scss';

const PAGESIZE = 6;

export default function Communities({
  scrollCommunitiesPosition,
  communitiesRef,
}) {
  const [communities, setCommunities] = useState([]);
  const [stories, setStories] = useState([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/communities`)
      .then((response) => setCommunities(response.data))
      .catch((error) => console.log(error));
  }, []);

  const fetchStories = (communityId) => {
    const queryParams = {
      keywords: '',
      filterType: 'communityId',
      filterValue: communityId,
      pageIndex: 0,
      pageSize: PAGESIZE,
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/stories/search`, {
        params: queryParams,
      })
      .then((response) => {
        if (!response.data.rows.length) {
          setStories(['empty']);
        } else {
          setStories(response.data.rows);
        }
        setIsSearchResultsVisible(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className={classes.Communities}
      style={{ left: scrollCommunitiesPosition }}
      ref={communitiesRef}
    >
      {communities.map((community) => (
        <Community
          title={community.title}
          id={community.id}
          click={() => fetchStories(community.id)}
        />
      ))}
      {isSearchResultsVisible && (
        <SearchResultsPopup
          searchResults={stories}
          zIndex={1}
          setIsSearchResultsVisible={setIsSearchResultsVisible}
          resetSearch={() => null}
        />
      )}
    </div>
  );
}
