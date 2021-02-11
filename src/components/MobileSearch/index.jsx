import React, { useState, useRef, useEffect } from 'react';

import classnames from 'classnames';

import SearchResultsItem from '../Search/SearchResultsPopup/SearchResultsItem';
import Spinner from '../Spinner';
import ErrorMessage from '../../pages/HomePage/ErrorMessage';
import { AREAS } from '../../constants/main';
import useApiRequest from '../../helpers/useApiRequest';
import useSearch from '../../helpers/useSearch';
import classes from './styles.module.scss';

let timer;
const PAGESIZE = 50;
const FIELDS = {
  author: 'authorName',
  community: 'communityId',
  keywords: 'keywords',
  area: 'location',
};

export default function MobileSearch({
  setIsSearchbarVisible,
  isSearchbarVisible,
}) {
  /* eslint-disable */
  const [
    communities,
    fetchCommunities,
    areCommunitiesFetching,
    communitiesFetchingError,
  ] = useApiRequest('get', '/communities');

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
  /* eslint-disable */

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState({
    option: 'author',
    type: 'author',
    value: '',
  });
  const [isAreasListVisible, setIsAreasListVisible] = useState(false);
  const [isCommunitiesListVisible, setIsCommunitiesListVisible] = useState(
    false
  );

  useEffect(() => {
    fetchCommunities();
  }, []);

  const optionsRef = useRef();
  const selectRef = useRef();

  let searchContent;

  if (stories && !areStoriesFetching && !storiesFetchingError) {
    if (stories[0] !== 'empty') {
      searchContent = stories.map((story) => (
        <SearchResultsItem
          key={story.id}
          searchResult={story}
          variant="mobile"
        />
      ));
    } else {
      searchContent = (
        <div className={classes.nothingFound}>
          <p>Nothing found</p>
        </div>
      );
    }
  } else if (areStoriesFetching) {
    searchContent = (
      <div className={classes.spinner}>
        <Spinner />
      </div>
    );
  } else if (storiesFetchingError) {
    searchContent = (
      <div className={classes.error}>
        <ErrorMessage message={storiesFetchingError.message} />
      </div>
    );
  }

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
    setSearch('');
  };

  const searchStoriesAfterUserStoppedTyping = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchStories();
    }, 1500);
  };

  const hideSearchbar = () => {
    setIsSearchbarVisible(false);
    setIsOptionsVisible(false);
  };

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

  return (
    <div
      className={
        isSearchbarVisible
          ? classnames(classes.MobileSearch, classes.visible)
          : classes.MobileSearch
      }
    >
      <div className={classes.searchHeader}>
        <i className={classes.closeIcon} onClick={hideSearchbar}>
          close
        </i>
        <form className={classes.searchForm} onSubmit={searchStories}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyUp={searchStoriesAfterUserStoppedTyping}
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
                    className={classnames(
                      classes.communitiesList,
                      isCommunitiesListVisible && classes.expand
                    )}
                  >
                    {communities &&
                      communities.map((community) => (
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
        </form>
      </div>
      <div className={classes.searchContent}>{searchContent}</div>
    </div>
  );
}