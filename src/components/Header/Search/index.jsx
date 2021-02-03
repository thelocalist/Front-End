import React, { useState, useRef, useEffect } from 'react';

import classnames from 'classnames';
import axios from 'axios';

import SearchResultsPopup from './SearchResultsPopup';
import { API_URL, AREAS } from '../../../constants/main';
import classes from './styles.module.scss';

const PAGESIZE = 6;
const FIELDS = {
  author: 'authorName',
  community: 'communityId',
  keywords: 'keywords',
  area: 'location',
};

export default function Search({ setIsSearchbarVisible }) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);

  const [isCommunitiesListVisible, setIsCommunitiesListVisible] = useState(
    false
  );
  const [communities, setCommunities] = useState([]);
  const [isAreasListVisible, setIsAreasListVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState({
    option: 'author',
    type: 'author',
    value: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsPage, setSearchResultsPage] = useState(0);
  const [searchResultsCount, setSearchResultsCount] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/communities`)
      .then((response) => {
        setCommunities(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const optionsRef = useRef();
  const selectRef = useRef();

  const hideOptionsOnOutsideClick = (event) => {
    if (!optionsRef.current) {
      return;
    }

    if (
      !optionsRef.current.contains(event.target) &&
      event.target !== selectRef.current
    ) {
      setIsOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', hideOptionsOnOutsideClick);
  }, []);

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible((prevState) => !prevState);
    setIsCommunitiesListVisible(false);
    setIsAreasListVisible(false);
  };

  const toggleCommunitiesListVisibility = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setIsCommunitiesListVisible((prevState) => {
      return !prevState;
    });
  };

  const toggleAreasListVisibility = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setIsAreasListVisible((prevState) => !prevState);
  };

  const hideSearchbar = () => {
    setIsSearchbarVisible(false);
  };

  const resetSearch = () => {
    setSearch('');
    setSearchResults([]);
    setSearchResultsPage(0);
  };

  const searchStories = (event, direction) => {
    let pageNumber = searchResultsPage;

    if (event) {
      event.preventDefault();
      if (search.trim() === '') {
        return;
      }
      resetSearch();
      pageNumber = 0;
    }

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
      keywords: search,
      filterType: FIELDS[searchFilter.type],
      filterValue: searchFilter.value,
      pageIndex: pageNumber,
      pageSize: PAGESIZE,
    };

    setIsSearchResultsVisible(true);
    axios
      .get(`${API_URL}/stories/search`, {
        params: queryParams,
      })
      .then((response) => {
        if (!response.data.rows.length) {
          setSearchResults(['empty']);
          return;
        }
        setSearchResults(response.data.rows);
        setSearchResultsCount(response.data.count);
        if (direction === 'forward') {
          setSearchResultsPage((prevState) => prevState + 1);
        } else if (direction === 'back') {
          setSearchResultsPage((prevState) => prevState - 1);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form className={classes.Search} onSubmit={searchStories}>
      {isSearchResultsVisible && (
        <SearchResultsPopup
          setIsSearchResultsVisible={setIsSearchResultsVisible}
          searchResults={searchResults}
          resetSearch={resetSearch}
          searchResultsPage={searchResultsPage}
          searchStories={searchStories}
        />
      )}
      <i
        role="button"
        className={classes.closeButton}
        tabIndex={0}
        onClick={hideSearchbar}
      >
        Close
      </i>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <div
        className={classes.select}
        onClick={toggleOptionsVisibility}
        ref={selectRef}
      >
        {searchFilter.option}
        {isOptionsVisible && (
          <ul className={classes.options} ref={optionsRef}>
            {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
            <li
              onClick={() => {
                setSearchFilter({
                  type: 'author',
                  value: '',
                  option: 'author',
                });
              }}
            >
              <span>author</span>
            </li>
            <li
              onClick={toggleAreasListVisibility}
              className={classes.expandable}
            >
              <span>location</span>
              <ul
                className={
                  isAreasListVisible
                    ? classnames(classes.areasList, classes.expand)
                    : classes.areasList
                }
              >
                {AREAS.map((area) => (
                  <li
                    onClick={(event) => {
                      event.stopPropagation();
                      setSearchFilter({
                        type: 'area',
                        value: area,
                        option: area,
                      });
                      toggleOptionsVisibility();
                    }}
                  >
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li
              onClick={toggleCommunitiesListVisibility}
              className={classes.expandable}
            >
              <span>community</span>
              <ul
                className={
                  isCommunitiesListVisible
                    ? classnames(classes.communitiesList, classes.expand)
                    : classes.communitiesList
                }
              >
                {communities.map((community) => (
                  <li
                    key={community.id}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSearchFilter({
                        type: 'community',
                        value: community.title,
                        option: community.title,
                      });
                      toggleOptionsVisibility();
                    }}
                  >
                    <span>{community.title}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li
              onClick={() => {
                setSearchFilter({
                  type: 'keywords',
                  value: '',
                  option: 'keywords',
                });
              }}
            >
              <span>keywords</span>
            </li>
            {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
          </ul>
        )}
      </div>
      <i
        role="button"
        className={classes.searchButton}
        tabIndex={0}
        onClick={searchStories}
      >
        Close
      </i>
    </form>
  );
}
