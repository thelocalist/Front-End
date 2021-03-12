import React, { useEffect, useContext } from 'react';

import { Link, useLocation } from 'react-router-dom';
import classes from './styles.module.scss';

import NoMainStory from '../NoMainStory';
import Spinner from '../../../components/Spinner';
import ErrorMessage from '../ErrorMessage';

import { Context } from '../../../context/index';
import { STATIC_URL } from '../../../constants/main';
import useSearch from '../../../helpers/useSearch';

export default function MainStory() {
  /* eslint-disable */
  const [
    stories,
    fetchStories,
    areStoriesFetching,
    storiesFetchingError,
  ] = useSearch('get', '/stories/search');
  /* eslint-disable */

  const [currentNeighborhood, , , , , setCurrentMainStory] = useContext(
    Context
  );

  /* useEffect(() => {
    const queryParams = {
      isMainStory: true,
      pageSize: 1,
    };

    fetchStories({ ...queryParams });
  }, []);
 */
  useEffect(() => {
    if (currentNeighborhood !== '') {
      const queryParams = {
        keywords: '',
        filterType: 'neighborhood',
        filterValue: currentNeighborhood.toLowerCase(),
        pageSize: 1,
      };

      fetchStories({
        ...queryParams,
        sortField: 'createdAt',
        sortOrder: 'desc',
      });
    } else {
      const queryParams = {
        isMainStory: true,
        pageSize: 1,
      };

      fetchStories({ ...queryParams });
    }
  }, [currentNeighborhood]);

  useEffect(() => {
    if (stories && stories[0] !== 'empty') {
      setCurrentMainStory(stories[0]);
    }
  }, [stories]);

  const location = useLocation();

  return (
    <Link
      preserveNeighborhoodSelection="true"
      className={classes.MainStory}
      to={
        stories && stories[0] !== 'empty'
          ? {
              pathname: `/story/${stories[0].id}`,
              state: { from: location.pathname },
            }
          : {}
      }
    >
      {stories && stories[0] !== 'empty' ? (
        <>
          <div
            className={classes.image}
            style={{
              backgroundImage: `url(${STATIC_URL}${stories[0].headerImagePath.replace(
                /\\/g,
                '/'
              )})`,
            }}
          />
          <div className={classes.header}>
            <h1 className={classes.title}>{stories[0].title}</h1>
            <div className={classes.author}>
              <span>{stories[0].authorName.toUpperCase()}</span>
            </div>
          </div>
        </>
      ) : stories && stories[0] === 'empty' ? (
        <NoMainStory visible />
      ) : !storiesFetchingError ? (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Spinner />
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <ErrorMessage message={storiesFetchingError.message} />
        </div>
      )}
    </Link>
  );
}
