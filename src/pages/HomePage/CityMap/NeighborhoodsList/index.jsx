import React, { useState, useContext, useEffect, useRef } from 'react';

import classnames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import { NEIGHBORHOODS } from '../../../../constants/main';
import { Neighborhood } from '../../../../context/index';

import classes from './styles.module.scss';

export default function NeighborhoodsList({ mobileContentHeight }) {
  const [neighborhoodsList, setNeighborhoodsList] = useState(NEIGHBORHOODS);
  const [
    isAllNeighborhoodsButtonsVisible,
    setIsAllNeighborhoodsButtonsVisible,
  ] = useState(false);

  const [currentNeighborhood, setCurrentNeighborhood] = useContext(
    Neighborhood
  );

  const neighborhoodsListRef = useRef(null);
  const neighborhoodsButtonsContainerRef = useRef(null);

  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  useEffect(() => {
    if (currentNeighborhood !== '') {
      const newNeighborhoodsList = [...NEIGHBORHOODS];
      setNeighborhoodsList(
        newNeighborhoodsList.sort((x, y) => {
          /* eslint-disable */
          return x === currentNeighborhood
            ? -1
            : y === currentNeighborhood
            ? 1
            : 0;
          /* eslint-disable */
        })
      );
    } else {
      setNeighborhoodsList([...NEIGHBORHOODS]);
    }
  }, [currentNeighborhood]);

  useEffect(() => {}, []);

  return (
    <div
      preserveNeighborhoodSelection="true"
      className={
        isAllNeighborhoodsButtonsVisible
          ? classnames(classes.NeighborhoodsList, classes.expand)
          : classes.NeighborhoodsList
      }
      ref={neighborhoodsListRef}
      style={{
        height:
          isMobile && isAllNeighborhoodsButtonsVisible
            ? `calc(100% - ${mobileContentHeight + 53 + 56 + 10}px)`
            : '',
      }}
    >
      <div
        className={
          isAllNeighborhoodsButtonsVisible
            ? classnames(classes.overlay, classes.visible)
            : classes.overlay
        }
      />
      {!isMobile && (
        <button
          type="button"
          className={classnames(
            classes.neighborhoodButton,
            classes.allButton,
            currentNeighborhood === '' && classes.active
          )}
          preserveNeighborhoodSelection="true"
          onClick={() => {
            setCurrentNeighborhood('');
            setIsAllNeighborhoodsButtonsVisible(false);
            neighborhoodsListRef.current.scrollTop = 0;
          }}
        >
          <span>All</span>
        </button>
      )}
      <button
        preserveNeighborhoodSelection="true"
        type="button"
        className={classnames(
          classes.neighborhoodButton,
          classes.ellipsisButton
        )}
        onClick={() => {
          setIsAllNeighborhoodsButtonsVisible((prevState) => !prevState);
        }}
      >
        <span>...</span>
      </button>
      <div
        className={classes.neighborhoodsButtonsContainer}
        ref={neighborhoodsButtonsContainerRef}
      >
        {isMobile && (
          <button
            type="button"
            className={classnames(
              classes.neighborhoodButton,
              classes.allButton,
              currentNeighborhood === '' && classes.active
            )}
            preserveNeighborhoodSelection="true"
            onClick={() => {
              setCurrentNeighborhood('');
              setIsAllNeighborhoodsButtonsVisible(false);
              neighborhoodsListRef.current.scrollTop = 0;
            }}
          >
            <span>All</span>
          </button>
        )}
        {neighborhoodsList.map((neighborhood) => {
          return (
            <button
              preserveNeighborhoodSelection="true"
              type="button"
              className={classnames(
                classes.neighborhoodButton,
                currentNeighborhood === neighborhood && classes.active
              )}
              onClick={() => {
                setCurrentNeighborhood(neighborhood);
                setIsAllNeighborhoodsButtonsVisible(false);
                neighborhoodsListRef.current.scrollTop = 0;
              }}
            >
              <span>{neighborhood}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
