import React, { useState, useRef, useEffect, useContext } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { Neighborhood } from '../../context';
import SearchResultsPopup from './SearchResultsPopup';
import useSearch from '../../helpers/useSearch';
import useApiRequest from '../../helpers/useApiRequest';
import { NEIGHBORHOODS } from '../../constants/main';
import useOnClickOutside from '../../helpers/useOnClickOutside';
import classes from './styles.module.scss';

const PAGESIZE = 6;
const FIELDS = {
  author: 'authorName',
  community: 'communityId',
  keywords: 'keywords',
  neighborhood: 'neighborhood',
};
const DEFAULT_FILTER = {
  option: 'author',
  type: 'author',
  value: '',
};

export default function Search({ setIsSearchbarVisible }) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const [isSearchExecutionNeeded, setIsSearchExecutionNeeded] = useState(false);
  const [isCommunitiesListVisible, setIsCommunitiesListVisible] = useState(
    false
  );

  const [isNeighborhoodsListVisible, setIsNeighborhoodsListVisible] = useState(
    false
  );
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState(DEFAULT_FILTER);

  const history = useHistory();
  const location = useLocation();

  /* eslint-disable no-unused-vars */
  const [
    currentNeighborhood,
    setCurrentNeighborhood,
    isMobileStoryOpened,
    setIsMobileStoryOpened,
  ] = useContext(Neighborhood);

  const changeNeighborhoodSelectionOnURLChange = () => {
    if (!location.search) {
      return;
    }
    const params = new URLSearchParams(location.search);
    if (params.get('filterType') === 'neighborhood') {
      // Fix selection of neighborhoods with ampersand containing titles
      if (params.get('filterValue').trim() === 'Greenpoint') {
        setCurrentNeighborhood('Greenpoint & Williamsburg');
      } else if (params.get('filterValue').trim() === 'Dumbo') {
        setCurrentNeighborhood('Dumbo & Downtown');
      } else if (params.get('filterValue').trim() === 'Jersey City') {
        setCurrentNeighborhood('Jersey City & Hoboken');
      } else {
        setCurrentNeighborhood(params.get('filterValue'));
      }
    } else {
      setCurrentNeighborhood('');
    }
  };

  useEffect(() => {
    changeNeighborhoodSelectionOnURLChange();
  }, [location.search]);

  const [
    stories,
    getStories,
    areStoriesFetching,
    storiesFetchingError,
    storiesCount,
    getPreviousPage,
    getNextPage,
    resetSearch,
    currentPage,
  ] = useSearch('get', '/stories/search');
  /* eslint-disable no-unused-vars */
  const [
    communities,
    fetchCommunities,
    areCommunitiesFetching,
    communitiesFetchingError,
  ] = useApiRequest('get', '/communities');

  useEffect(() => {
    if (!communities) {
      return;
    }
    history.push(
      `/home/search?keywords=${search}&filterType=${
        FIELDS[searchFilter.type]
      }&filterValue=${searchFilter.value}&pageSize=${PAGESIZE}&pageIndex=0`
    );
  }, [searchFilter, search]);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const optionsRef = useRef();
  const selectRef = useRef();

  useOnClickOutside(optionsRef, () => setIsOptionsVisible(false));

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
    history.push('/home');
    setCurrentNeighborhood('');
  };

  const searchStories = (event) => {
    if (event) {
      event.preventDefault();
      resetSearch();
    }

    if (search.trim() === '') {
      return;
    }

    setIsSearchExecutionNeeded(false);

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

    if (params.get('keywords')) {
      setIsSearchExecutionNeeded(true);
    }
  };

  useEffect(() => {
    if (isSearchExecutionNeeded) {
      searchStories();
    }
  }, [search]);

  useEffect(() => {
    if (communities) {
      setInitialQueryParamsAndSearchStories();
    }
  }, [communities]);

  return (
    <form className={classes.Search} onSubmit={searchStories}>
      {isSearchResultsVisible && (
        <SearchResultsPopup
          setIsSearchResultsVisible={setIsSearchResultsVisible}
          searchResults={stories}
          resetSearch={resetSearch}
          getNextPage={getNextPage}
          getPreviousPage={getPreviousPage}
          currentPage={currentPage}
          storiesCount={storiesCount}
          pageSize={PAGESIZE}
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
        className={classnames(
          classes.select,
          searchFilter.option === DEFAULT_FILTER && classes.placeholder
        )}
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
