import React, { useState, useRef, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import classnames from 'classnames';

import SearchResultsItem from '../Search/SearchResultsPopup/SearchResultsItem';
import Spinner from '../Spinner';
import ErrorMessage from '../../pages/HomePage/ErrorMessage';
import { NEIGHBORHOODS } from '../../constants/main';
import useApiRequest from '../../helpers/useApiRequest';
import useSearch from '../../helpers/useSearch';
import classes from './styles.module.scss';

let timer;
const PAGESIZE = 50;
const FIELDS = {
  author: 'authorName',
  community: 'communityId',
  keywords: 'keywords',
  neighborhood: 'neighborhood',
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
  const [isNeighborhoodsListVisible, setIsNeighborhoodsListVisible] = useState(
    false
  );
  const [isCommunitiesListVisible, setIsCommunitiesListVisible] = useState(
    false
  );

  const history = useHistory();

  useEffect(() => {
    if (!communities || !isSearchbarVisible) {
      return;
    }
    history.push(
      `/home/search?keywords=${search}&filterType=${
        FIELDS[searchFilter.type]
      }&filterValue=${searchFilter.value}&pageSize=${PAGESIZE}&pageIndex=0`
    );
  }, [searchFilter, search]);

  const setInitialQueryParamsAndSearchStories = () => {
    if (!location.search) {
      return;
    }
    const params = new URLSearchParams(location.search);

    const reversedFields = {};

    Object.entries(FIELDS).forEach((entry) => {
      const key = entry[0];
      const value = entry[1];
      reversedFields[value] = key;
    });

    let option;
    if (params.get('filterValue')) {
      if (params.get('filterType') === 'communityId') {
        option = '';
        option = communities.find((community) => {
          return community.id === +params.get('filterValue');
        }).title;
      } else {
        // Fix selection of neighborhoods with ampersand containing titles
        option = params.get('filterValue');
        if (params.get('filterValue').trim() === 'Greenpoint') {
          option = 'Greenpoint & Williamsburg';
        } else if (params.get('filterValue').trim() === 'Dumbo') {
          option = 'Dumbo & Downtown';
        } else if (params.get('filterValue').trim() === 'Jersey City') {
          option = 'Jersey City & Hoboken';
        }
      }
    } else if (params.get('filterType') === 'authorName') {
      option = 'author';
    } else if (params.get('filterType') === 'keywords') {
      option = 'keywords';
    }

    setSearchFilter({
      type: reversedFields[params.get('filterType')],
      value: params.get('filterValue'),
      option,
    });

    setSearch(params.get('keywords'));
  };

  useEffect(() => {
    if (communities) {
      setInitialQueryParamsAndSearchStories();
    }
  }, [communities]);

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
  };

  const searchStoriesAfterUserStoppedTyping = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (search.trim() !== '') {
        searchStories();
      }
    }, 1500);
  };

  useEffect(() => {
    if (search) {
      searchStories();
    }
  }, [searchFilter]);

  const hideSearchbar = () => {
    setIsSearchbarVisible(false);
    setIsOptionsVisible(false);
    resetSearch();
    history.push('/home');
    setSearch('');
  };

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
        <form
          className={classes.searchForm}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
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
                        key={neighborhood.id}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSearchFilter({
                            type: 'neighborhood',
                            value: neighborhood,
                            option: neighborhood,
                          });
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
