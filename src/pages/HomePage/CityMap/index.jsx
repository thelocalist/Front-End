import React from 'react';

import classes from './styles.module.scss';

export default function CityMap() {
  return (
    <div className={classes.CityMap}>
      <svg
        width="137"
        height="120"
        viewBox="0 0 137 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M27.606 117.5L2.18316 66.8311L134.638 2.99999L126.441 31.7125L107.068 44.2817L115.506 59.2881L99.4116 69.7119L88.25 69.9276L68.5667 97.6722L27.606 117.5Z"
            fill="#2F4274"
            stroke="#2F4274"
            strokeWidth="3"
          />
        </g>
        <g>
          <path
            d="M2.6331 36.591L81.4561 2.28168L96.6711 34.7745L18.1743 70.5545L2.6331 36.591Z"
            fill="#2F4274"
            stroke="#2F4274"
            strokeWidth="3"
          />
        </g>
        <g>
          <path
            d="M77.575 12.7948L103.101 1.86423L184.201 175.647L81.6577 224.149L38.6949 210.63L31.1633 198.858L6.12246 198.386L0.913601 174.132L7.44853 128.033L33.3434 83.1928L98.9444 53.8337L77.575 12.7948Z"
            fill="#2F4274"
          />
        </g>
      </svg>
    </div>
  );
}
