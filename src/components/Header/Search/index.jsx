import React, { useState, useRef, useEffect } from 'react';

import classnames from 'classnames';
import axios from 'axios';

import SearchResultsPopup from './SearchResultsPopup';
import { API_URL, AREAS } from '../../../constants/main';
import classes from './styles.module.scss';

export default function Search({ setIsSearchbarVisible }) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('author');
  const [communitiesListClasses, setcommunitiesListClasses] = useState(
    classes.communitiesList
  );
  const [communities, setCommunities] = useState([]);
  const [areasListClasses, setAreasListClasses] = useState(classes.areasList);
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState({
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

  const toggleOptionsVisibility = () => {
    if (isOptionsVisible) {
      document.removeEventListener('mousedown', hideOptionsOnOutsideClick);
    } else {
      document.addEventListener('mousedown', hideOptionsOnOutsideClick);
    }

    setIsOptionsVisible((prevState) => !prevState);
    setcommunitiesListClasses(classes.communitiesList);
    setAreasListClasses(classes.areasList);
  };

  const toggleCommunitiesListVisibility = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setcommunitiesListClasses((prevState) => {
      if (prevState === classes.communitiesList) {
        return classnames(classes.communitiesList, classes.expand);
      }
      return classes.communitiesList;
    });
  };

  const toggleAreasListVisibility = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setAreasListClasses((prevState) => {
      if (prevState === classes.areasList) {
        return classnames(classes.areasList, classes.expand);
      }
      return classes.areasList;
    });
  };

  const hideSearchbar = () => {
    setIsSearchbarVisible(false);
  };

  const searchStories = (event, direction) => {
    const PAGESIZE = 6;
    const FIELDS = {
      author: 'authorName',
      community: 'communityId',
      keywords: 'keywords',
    };

    let pageNumber = searchResultsPage;

    if (direction === 'forward') {
      pageNumber += 1;
    } else if (direction === 'back') {
      pageNumber -= 1;
    }

    if (event) {
      event.preventDefault();
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
          setSearchResultsPage={setSearchResultsPage}
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
        {selectedOption}
        {isOptionsVisible && (
          <ul className={classes.options} ref={optionsRef}>
            {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
            <li
              onClick={() => {
                setSelectedOption('author');
                setSearchFilter({ type: 'author', value: '' });
              }}
            >
              <span>author</span>
            </li>
            <li
              onClick={toggleAreasListVisibility}
              className={classes.expandable}
            >
              <span>location</span>
              <ul className={areasListClasses}>
                {AREAS.map((area) => (
                  <li
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedOption(area);
                      setSearchFilter({ type: 'area', value: area });
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
              <ul className={communitiesListClasses}>
                {communities.map((community) => (
                  <li
                    key={community.id}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedOption(community.title);
                      setSearchFilter({
                        type: 'community',
                        value: community.title,
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
                setSelectedOption('keywords');
                setSearchFilter({ type: 'keywords', value: '' });
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
