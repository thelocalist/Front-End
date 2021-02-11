import React, { useRef, useState, useEffect } from 'react';

import Stories from './Stories';
import classes from './styles.module.scss';

const MAP_SIZE = { width: 660, height: 500 };

const MAP_VIEW_AREA_SIZE = {
  width: 520,
  height: 460,
};

export default function CityMap({ localStoriesFound, setLocalStoriesFound }) {
  const [mapSize, setMapSize] = useState({});

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
  }, []);

  return (
    <div className={classes.CityMap}>
      <div className={classes.map} ref={mapContainerRef}>
        <svg
          onClick={(event) => {
            console.log(event.target.parentNode.firstElementChild.textContent);
            setLocalStoriesFound(['empty']);
          }}
          className={classes.svg}
          fill="none"
          width={mapSize.width}
          height={mapSize.height}
          viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={classes.noHover}
            d="M418.644 160.215L485.807 133.539L466.939 95.2305L187.767 220.267L108.833 325.726L117.569 340.059L151.582 349.07L190.777 376.109L225.275 347.647L242.649 308.638L335.205 282.68L343.241 260.771L385.524 259.954L391.792 209.075L418.644 160.215Z"
            stroke="#7284B6"
          />

          <g>
            <path
              className={classes.noHover}
              d="M256.86 231.018L337.125 194.42L349.696 219.556L267.015 256.201L256.86 231.018Z"
              fill="#082B3A"
              stroke="#7284B6"
            />
          </g>
          <g>
            <title>TEST2</title>
            <path
              className={classes.noHover}
              d="M-71.002 463.044L89.3472 396.197L128.724 475.784L453.71 317.553L480.55 330.63L471.677 356.181L493.261 363.015L498.42 379.835L530.571 355.043L1160.5 355.043L1160.5 470L1160.5 720L-19.499 720L-75.8971 475.526L-71.002 463.044Z"
              fill="url(#paint0_linear)"
              stroke="#7284B6"
              strokeWidth="0.5"
            />
          </g>
          <g filter="url(#filter0_f)">
            <path
              className={classes.noHover}
              d="M8.88558 234.902L35.5782 287.259L-81.0205 335.435L-87.7764 -14.3027L619.25 -27.9604L475.333 44.9143L460.624 18.6108L8.88558 234.902Z"
              fill="url(#paint1_linear)"
            />
            <path
              d="M8.88558 234.902L35.5782 287.259L-81.0205 335.435L-87.7764 -14.3027L619.25 -27.9604L475.333 44.9143L460.624 18.6108L8.88558 234.902Z"
              stroke="#7284B6"
            />
          </g>
          <g filter="url(#filter1_d)">
            <g>
              <title>Harlem</title>
              <path
                title="SDSADSA"
                d="M320.459 160.601L368.006 260.293L384.919 259.966L392.088 208.767L418.952 160.511L436.335 153.227L416.619 117.956L320.459 160.601Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Washington Heights</title>
              <path
                d="M416.128 118.787L435.832 153.454L485.611 134.062L466.755 96.3577L416.128 118.787Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>FIDI</title>
              <path
                d="M109.128 325.418L131.534 296.585L151.57 348.466L117.569 340.059L109.128 325.418Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Soho & Tribeca</title>
              <path
                d="M169.392 301.291L152.156 269.296L131.22 295.986L138.197 313.073L169.392 301.291Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Lower East Side</title>
              <path
                d="M191.375 375.795L203.258 365.293L169.385 300.989L138.493 312.765L151.878 348.762L191.375 375.795Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Greenwich Village</title>
              <path
                d="M152.133 268.088L170.705 244.163L222.603 350.116L203.56 365.288L152.133 268.088Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Chelsea</title>
              <path
                d="M188.662 219.646L202.449 213.941L229.66 277.468L194.005 292.961L170.107 244.477L188.662 219.646Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Flatiron</title>
              <path
                d="M225.879 347.635L243.555 308.621L229.363 277.775L194.609 292.949L222.313 350.725L225.879 347.635Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Midtown</title>
              <path
                d="M202.751 213.935L241.39 196.572L282.607 296.99L243.555 308.621L202.751 213.935Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Upper West Side</title>
              <path
                d="M240.775 195.979L320.766 160.897L336.213 194.136L256.552 230.722L240.775 195.979Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Upper East Side</title>
              <path
                d="M282.614 297.292L267.323 256.497L349.115 220.776L367.989 259.387L344.432 259.842L335.21 282.982L282.614 297.292Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Upper East Side</title>
              <path
                d="M357.13 291.622L349.202 287.848L274.088 309.542L263.977 317.894L279.984 317.585L357.241 297.361L357.13 291.622Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Bronx</title>
              <path
                d="M469.331 93.9757L495.192 82.9015L577.357 258.968L473.467 308.107L429.94 294.41L422.309 282.483L396.939 282.005L391.662 257.433L398.283 210.728L424.518 165.299L490.981 135.554L469.331 93.9757Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Astoria</title>
              <path
                d="M403.916 304.919L453.076 316.055L335.746 373.309L298.582 326.29L365.002 308.088L383.123 307.738L379.33 299.049L388.285 293.438L397.95 293.251L403.916 304.919Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Dumbo & Downtown</title>
              <path
                d="M207.411 384.169L209.611 435.489L127.593 475.142L89.8282 397.015L104.55 377.093L112.036 373.624L118.379 373.502L147.682 388.949L151.44 395.825L153.916 414.51L163.232 411.913L163.063 403.154L170.009 403.02L170.225 414.195L181.439 400.382L207.411 384.169Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Greenpoint & Williamsburg</title>
              <path
                d="M283.433 386.372L280.094 401.241L209.738 434.626L208.746 383.283L228.296 378.675L233.21 382.81L235.928 382.758L233.029 373.447L246.921 357.468L254.668 351.88L264.385 354.412L272.656 360.295L283.433 386.372Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Long Island City</title>
              <path
                d="M298.292 326.9L335.142 373.321L287.239 395.999L290.061 385.672L271.826 348.862L261.215 346.952L257.207 342.8L257.113 337.968L285.909 327.139L298.292 326.9Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>West New York</title>
              <path
                d="M460.026 18.9244L144.801 170.037L136.004 199.514L116.014 212.589L124.431 226.023L169.312 187.691L232.02 165.029L263.394 146.899L278.534 133.011L299.071 132.614L474.729 44.9259L460.026 18.9244Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
            <g>
              <title>Jersey City & Hoboken</title>
              <path
                d="M35.2763 287.265L9.80925 235.79L142.402 170.99L134.203 200.153L114.811 212.915L123.263 228.16L107.153 238.744L95.9781 238.96L76.2795 267.137L35.2763 287.265Z"
                fill="#071332"
                stroke="#7284B6"
              />
            </g>
          </g>
          <path
            className={classes.noHover}
            d="M495.99 81.9797L1145 -169L1162.5 308.101L585.55 308.101L473.77 308.101L532.778 281.583L579.159 258.329L565.926 230.184L551.786 202.057L524.663 143.061L495.99 81.9797Z"
            fill="url(#paint2_linear)"
            stroke="#7284B6"
            strokeWidth="0.5"
          />
          <defs>
            <filter
              id="filter0_f"
              x="-92.2861"
              y="-32.4645"
              width="722.524"
              height="372.642"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur"
              />
            </filter>
            <filter
              id="filter1_d"
              x="3.92285"
              y="17.9882"
              width="578.098"
              height="465.822"
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
              x1="138"
              y1="429.5"
              x2="112.458"
              y2="306.704"
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
              x1="61.6367"
              y1="77.3391"
              x2="297.726"
              y2="643.95"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00030A" />
              <stop offset="0.0520833" stopColor="#00030A" />
              <stop offset="0.411458" stopColor="#071332" />
              <stop offset="0.515625" stopColor="#00030A" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear"
              x1="768.476"
              y1="116.969"
              x2="389.796"
              y2="142.223"
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
