import React, { useState, useContext, useEffect } from 'react';

import classnames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import { NEIGHBORHOODS } from '../../../../constants/main';
import { Context } from '../../../../context/index';

import classes from './styles.module.scss';

export default function NeighborhoodsList() {
  const [neighborhoodsList, setNeighborhoodsList] = useState(NEIGHBORHOODS);
  const [
    isAllNeighborhoodsButtonsVisible,
    setIsAllNeighborhoodsButtonsVisible,
  ] = useState(false);

  const [currentNeighborhood, setCurrentNeighborhood] = useContext(Context);

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

  return (
    <div
      className={
        isAllNeighborhoodsButtonsVisible
          ? classnames(classes.NeighborhoodsList, classes.expand)
          : classes.NeighborhoodsList
      }
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
          className={classnames(classes.neighborhoodButton, classes.allButton)}
          preserveNeighborhoodSelection="true"
          onClick={() => {
            setIsAllNeighborhoodsButtonsVisible((prevState) => !prevState);
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
      >
        <span>...</span>
      </button>
      <div
        className={
          currentNeighborhood !== ''
            ? classnames(
                classes.neighborhoodsButtonsContainer,
                classes.activeNeighborhood
              )
            : classes.neighborhoodsButtonsContainer
        }
      >
        {isMobile && (
          <button
            type="button"
            className={classnames(
              classes.neighborhoodButton,
              classes.allButton
            )}
            preserveNeighborhoodSelection="true"
            onClick={(event) => {
              setIsAllNeighborhoodsButtonsVisible((prevState) => !prevState);
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
              className={classes.neighborhoodButton}
              onClick={() => {
                setCurrentNeighborhood(neighborhood);
                setIsAllNeighborhoodsButtonsVisible(false);
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
