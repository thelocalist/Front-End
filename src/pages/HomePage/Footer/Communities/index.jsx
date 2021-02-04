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
  const [currentCommunityId, setCurrentCommunityId] = useState(null);
  const [stories, setStories] = useState([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const [searchResultsPage, setSearchResultsPage] = useState(0);
  const [searchResultsCount, setSearchResultsCount] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/communities`)
      .then((response) => setCommunities(response.data))
      .catch((error) => console.log(error));
  }, []);

  const fetchStories = (communityId, direction) => {
    let pageNumber = searchResultsPage;

    if (direction === 'forward') {
      pageNumber += 1;
    } else if (direction === 'back') {
      pageNumber -= 1;
    }

    if (
      pageNumber < 0 ||
      (searchResultsCount - PAGESIZE * pageNumber < 1 && searchResultsCount)
    ) {
      return;
    }

    const queryParams = {
      keywords: '',
      filterType: 'communityId',
      filterValue: communityId || currentCommunityId,
      pageIndex: pageNumber,
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
          setSearchResultsCount(response.data.count);
          if (communityId) {
            setCurrentCommunityId(communityId);
          }
          if (direction === 'forward') {
            setSearchResultsPage((prevState) => prevState + 1);
          } else if (direction === 'back') {
            setSearchResultsPage((prevState) => prevState - 1);
          }
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
          searchResultsPage={searchResultsPage}
          searchStories={fetchStories}
        />
      )}
    </div>
  );
}
