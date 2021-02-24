import React, { useState, useRef, useEffect, useContext } from 'react';

import classnames from 'classnames';

import { Context } from '../../context';
import { SearchContext } from '../../context/searchContext';
import SearchResultsPopup from './SearchResultsPopup';
import useSearch from '../../helpers/useSearch';
import useApiRequest from '../../helpers/useApiRequest';
import { NEIGHBORHOODS } from '../../constants/main';
import classes from './styles.module.scss';

const PAGESIZE = 6;
const FIELDS = {
  author: 'authorName',
  community: 'communityId',
  keywords: 'keywords',
  neighborhood: 'neighborhood',
};

export default function Search({ setIsSearchbarVisible }) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);

  const [isCommunitiesListVisible, setIsCommunitiesListVisible] = useState(
    false
  );

  const [isNeighborhoodsListVisible, setIsNeighborhoodsListVisible] = useState(
    false
  );
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState({
    option: 'author',
    type: 'author',
    value: '',
  });

  /* eslint-disable no-unused-vars */
  const [
    currentNeighborhood,
    setCurrentNeighborhood,
    isMobileStoryOpened,
    setIsMobileStoryOpened,
  ] = useContext(Context);

  const [
    isSearchByNeighborhoodActive,
    setIsSearchByNeighborhoodActive,
  ] = useContext(SearchContext);

  const [
    stories,
    getStories,
    areStoriesFetching,
    storiesFetchingError,
    storiesCount,
    getPreviousPage,
    getNextPage,
    resetSearch,
  ] = useSearch('get', '/stories/search');
  /* eslint-disable no-unused-vars */
  const [
    communities,
    fetchCommunities,
    areCommunitiesFetching,
    communitiesFetchingError,
  ] = useApiRequest('get', '/communities');

  useEffect(() => {
    fetchCommunities();
  }, []);

  console.log('SEARCH HAS RENDERED');

  const optionsRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    if (searchFilter.type === 'neighborhood') {
      console.log('setting search by neighborhood to active');
      setIsSearchByNeighborhoodActive(true);
    }
  }, [searchFilter]);

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
    setIsNeighborhoodsListVisible(false);
  };

  const toggleCommunitiesListVisibility = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setIsCommunitiesListVisible((prevState) => {
      return !prevState;
    });
  };

  const toggleNeighborhoodsListVisibility = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setIsNeighborhoodsListVisible((prevState) => !prevState);
  };

  const hideSearchbar = () => {
    setIsSearchbarVisible(false);
  };

  const searchStories = (event) => {
    if (event) {
      event.preventDefault();
      if (search.trim() === '') {
        return;
      }
      resetSearch();
    }

    const queryParams = {
      keywords: search,
      filterType: FIELDS[searchFilter.type],
      filterValue: searchFilter.value,
      // pageIndex: pageNumber,
      pageSize: PAGESIZE,
    };

    getStories(queryParams);

    setIsSearchResultsVisible(true);
  };

  return (
    <form className={classes.Search} onSubmit={searchStories}>
      {isSearchResultsVisible && (
        <SearchResultsPopup
          setIsSearchResultsVisible={setIsSearchResultsVisible}
          searchResults={stories}
          resetSearch={resetSearch}
          getNextPage={getNextPage}
          getPreviousPage={getPreviousPage}
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
              onClick={toggleNeighborhoodsListVisibility}
              className={classes.expandable}
            >
              <span>location</span>
              <ul
                className={
                  isNeighborhoodsListVisible
                    ? classnames(classes.neighborhoodsList, classes.expand)
                    : classes.neighborhoodsList
                }
              >
                {NEIGHBORHOODS.map((neighborhood) => (
                  <li
                    key={neighborhood}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSearchFilter({
                        type: 'neighborhood',
                        value: neighborhood,
                        option: neighborhood,
                      });
                      setCurrentNeighborhood(neighborhood);
                      toggleOptionsVisibility();
                    }}
                  >
                    <span>{neighborhood}</span>
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
                className={classnames(
                  classes.communitiesList,
                  isCommunitiesListVisible && classes.expand
                )}
              >
                {communities.map((community) => (
                  <li
                    key={community.id}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSearchFilter({
                        type: 'community',
                        value: community.id,
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
