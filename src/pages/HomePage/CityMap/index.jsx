import React, { useRef, useState, useEffect } from 'react';

import Stories from './Stories';
import classes from './styles.module.scss';

const MAP_SIZE = { width: 1152, height: 723 };

const MAP_VIEW_AREA_SIZE = {
  width: 750,
  height: 400,
};

export default function CityMap({ localStoriesFound, setLocalStoriesFound }) {
  const [mapSize, setMapSize] = useState({});
  const [currentNeighborhood, setCurrentNeighborhood] = useState('');

  const mapContainerRef = useRef(null);
  const resizeMap = () => {
    const ratio = Math.max(
      MAP_VIEW_AREA_SIZE.width / mapContainerRef.current.clientWidth,
      MAP_VIEW_AREA_SIZE.height / mapContainerRef.current.clientHeight
    );
    const newMapSize = {
      width: MAP_SIZE.width / ratio,
      height: MAP_SIZE.height / ratio,
    };
    setMapSize(newMapSize);
  };

  useEffect(() => {
    resizeMap();
    window.addEventListener('resize', resizeMap);
    return () => {
      window.removeEventListener('resize', resizeMap);
    };
  }, []);

  return (
    <div className={classes.CityMap}>
      <div className={classes.map} ref={mapContainerRef}>
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width={mapSize.width}
          height={mapSize.height}
          className={classes.svg}
          viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`}
          onClick={(event) => {
            event.stopPropagation();
            // console.log(event.target.parentNode.firstElementChild.textContent);
            if (
              event.target.parentNode.firstElementChild.textContent.length > 100
            ) {
              return;
            }
            console.log(event.target.parentNode.firstElementChild.textContent);
            setCurrentNeighborhood(
              event.target.parentNode.firstElementChild.textContent
            );
            setLocalStoriesFound(['empty']);
          }}
        >
          <path
            d="M697.644 261.864L764.806 235.188L745.938 196.879L466.767 321.916L387.832 427.375L396.569 441.708L430.582 450.719L469.777 477.758L504.274 449.296L521.649 410.287L614.204 384.329L622.241 362.42L664.523 361.603L670.792 310.724L697.644 261.864Z"
            stroke="#7284B6"
          />
          <path
            className={classes.noHover}
            d="M535.86 332.667L616.124 296.069L628.695 321.205L546.015 357.85L535.86 332.667Z"
            fill="#082B3A"
            stroke="#7284B6"
          />
          <path
            className={classes.noHover}
            d="M207.997 564.693L368.346 497.846L407.723 577.433L732.709 419.202L759.549 432.279L750.677 457.83L772.26 464.664L777.419 481.484L809.571 456.692L1151.5 456.692L1151.5 571.649L1151.5 723L-3.99983 723L-3.99999 662L207.997 564.693Z"
            fill="url(#paint0_linear)"
            stroke="#7284B6"
            strokeWidth="0.5"
          />
          <path
            className={classes.noHover}
            d="M287.885 336.551L314.578 388.908L0.755562 526.238L0.755421 -1.00013L1127.5 -1.00013L754.333 146.563L739.624 120.26L287.885 336.551Z"
            fill="url(#paint1_linear)"
            stroke="#7284B6"
          />
          <g filter="url(#filter0_d)">
            <g>
              <title>Harlem</title>
              <path
                className={
                  currentNeighborhood === 'Harlem' ? classes.active : null
                }
                d="M599.459 262.25L647.006 361.942L663.919 361.615L671.088 310.416L697.952 262.16L715.335 254.876L695.619 219.605L599.459 262.25Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Washington Heights</title>
              <path
                className={
                  currentNeighborhood === 'Washington Heights'
                    ? classes.active
                    : null
                }
                d="M695.129 220.436L714.833 255.103L764.612 235.711L745.756 198.007L695.129 220.436Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>FIDI</title>
              <path
                className={
                  currentNeighborhood === 'FIDI' ? classes.active : null
                }
                d="M388.128 427.067L410.534 398.234L430.57 450.115L396.569 441.708L388.128 427.067Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Soho & Tribeca</title>
              <path
                className={
                  currentNeighborhood === 'Soho & Tribeca'
                    ? classes.active
                    : null
                }
                d="M448.391 402.94L431.156 370.945L410.22 397.635L417.197 414.722L448.391 402.94Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Lower East Side</title>
              <path
                className={
                  currentNeighborhood === 'Lower East Side'
                    ? classes.active
                    : null
                }
                d="M470.375 477.444L482.258 466.942L448.385 402.638L417.493 414.414L430.878 450.411L470.375 477.444Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Greenwich Village</title>
              <path
                className={
                  currentNeighborhood === 'Greenwich Village'
                    ? classes.active
                    : null
                }
                d="M431.132 369.737L449.704 345.812L501.603 451.765L482.56 466.937L431.132 369.737Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Chelsea</title>
              <path
                className={
                  currentNeighborhood === 'Chelsea' ? classes.active : null
                }
                d="M467.661 321.295L481.449 315.59L508.659 379.116L473.005 394.61L449.106 346.126L467.661 321.295Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Flatiron</title>
              <path
                className={
                  currentNeighborhood === 'Flatiron' ? classes.active : null
                }
                d="M504.878 449.284L522.555 410.27L508.363 379.424L473.609 394.598L501.312 452.374L504.878 449.284Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Midtown</title>
              <path
                className={
                  currentNeighborhood === 'Midtown' ? classes.active : null
                }
                d="M481.751 315.584L520.391 298.221L561.608 398.639L522.555 410.27L481.751 315.584Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Upper West Side</title>
              <path
                className={
                  currentNeighborhood === 'Upper West Side'
                    ? classes.active
                    : null
                }
                d="M519.775 297.628L599.767 262.547L615.213 295.785L535.553 332.371L519.775 297.628Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Upper East Side</title>
              <path
                className={
                  currentNeighborhood === 'Upper East Side'
                    ? classes.active
                    : null
                }
                d="M561.613 398.941L546.323 358.146L628.115 322.425L646.989 361.036L623.431 361.491L614.21 384.631L561.613 398.941Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Roosevelt Island</title>
              <path
                className={
                  currentNeighborhood === 'Roosevelt Island'
                    ? classes.active
                    : null
                }
                d="M636.13 393.271L628.202 389.497L553.088 411.19L542.977 419.543L558.984 419.234L636.241 399.01L636.13 393.271Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Bronx</title>
              <path
                className={
                  currentNeighborhood === 'Bronx' ? classes.active : null
                }
                d="M748.331 195.625L774.192 184.551L856.358 360.617L752.467 409.756L708.94 396.059L701.31 384.132L675.94 383.654L670.662 359.082L677.283 312.377L703.518 266.948L769.981 237.203L748.331 195.625Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Astoria</title>
              <path
                className={
                  currentNeighborhood === 'Astoria' ? classes.active : null
                }
                d="M682.916 406.568L732.076 417.703L614.746 474.958L577.582 427.939L644.002 409.737L662.123 409.387L658.33 400.698L667.285 395.087L676.95 394.9L682.916 406.568Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Dumbo & Downtown</title>
              <path
                className={
                  currentNeighborhood === 'Dumbo & Downtown'
                    ? classes.active
                    : null
                }
                d="M486.411 485.818L488.611 537.138L406.593 576.791L368.828 498.664L383.55 478.741L391.036 475.273L397.379 475.151L426.682 490.598L430.44 497.474L432.916 516.159L442.232 513.562L442.063 504.803L449.009 504.669L449.225 515.844L460.439 502.031L486.411 485.818Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Greenpoint & Williamsburg</title>
              <path
                className={
                  currentNeighborhood === 'Greenpoint & Williamsburg'
                    ? classes.active
                    : null
                }
                d="M562.433 488.021L559.094 502.89L488.738 536.275L487.746 484.932L507.296 480.324L512.21 484.459L514.928 484.407L512.029 475.097L525.921 459.117L533.668 453.529L543.385 456.061L551.656 461.944L562.433 488.021Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Long Island City</title>
              <path
                className={
                  currentNeighborhood === 'Long Island City'
                    ? classes.active
                    : null
                }
                d="M577.292 428.549L614.142 474.97L566.239 497.648L569.061 487.321L550.826 450.511L540.215 448.602L536.207 444.449L536.113 439.617L564.909 428.788L577.292 428.549Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>West New York</title>
              <path
                className={
                  currentNeighborhood === 'West New York'
                    ? classes.active
                    : null
                }
                d="M739.026 120.574L423.8 271.686L415.003 301.163L395.013 314.238L403.43 327.672L448.312 289.34L511.019 266.678L542.393 248.548L557.534 234.66L578.071 234.263L753.728 146.575L739.026 120.574Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Jersey City & Hoboken</title>
              <path
                className={
                  currentNeighborhood === 'Jersey City & Hoboken'
                    ? classes.active
                    : null
                }
                d="M314.276 388.914L288.809 337.439L421.401 272.639L413.203 301.802L393.811 314.564L402.263 329.809L386.152 340.393L374.978 340.609L355.279 368.786L314.276 388.914Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
          </g>
          <path
            className={classes.noHover}
            d="M774.988 183.629L1154.5 37.5L1154.5 409.75L864.548 409.75L752.769 409.75L811.776 383.232L858.158 359.978L844.924 331.833L830.785 303.706L803.662 244.71L774.988 183.629Z"
            fill="url(#paint2_linear)"
            stroke="#7284B6"
            strokeWidth="0.5"
          />
          <defs>
            <filter
              id="filter0_d"
              x="284.138"
              y="119.921"
              width="576.884"
              height="465.538"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear"
              x1="416.979"
              y1="531.148"
              x2="391.437"
              y2="408.351"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#000102" />
              <stop offset="0.3125" stopColor="#071332" />
              <stop
                offset="0.985119"
                stopColor="#03091B"
                stopOpacity="0.187116"
              />
              <stop offset="0.985219" stopColor="#03091B" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="340.636"
              y1="178.989"
              x2="576.725"
              y2="745.6"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00030A" />
              <stop offset="0.0520833" stopColor="#00030A" />
              <stop offset="0.411458" stopColor="#071332" />
              <stop offset="0.515625" stopColor="#00030A" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear"
              x1="1047.48"
              y1="218.618"
              x2="668.796"
              y2="243.872"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.614583" stopColor="#00030B" />
              <stop offset="1" stopColor="#00030B" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Stories stories={localStoriesFound} />
    </div>
  );
}
