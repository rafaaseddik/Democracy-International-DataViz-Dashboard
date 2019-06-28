import React, { Component } from 'react';
import'./UnderConstruction.css'
class UnderConstruction extends Component {
  render() {
    return (
      <svg className='svgUnderConstruction ' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox=" 0 0 191 191">

          <polygon className="star" points="95.5 50.73 111.05 7.32 110.81 53.43 140.27 17.95 124.28 61.2 164.09 37.94 134.27 73.11 179.64 64.87 139.59 87.72 185.04 95.5 139.59 103.28 179.64 126.13 134.27 117.89 164.09 153.06 124.28 129.8 140.27 173.05 110.81 137.57 111.05 183.68 95.5 140.27 79.95 183.68 80.19 137.57 50.73 173.05 66.72 129.8 26.91 153.06 56.73 117.89 11.36 126.13 51.41 103.28 5.96 95.5 51.41 87.72 11.36 64.87 56.73 73.11 26.91 37.94 66.72 61.2 50.73 17.95 80.19 53.43 79.95 7.32 95.5 50.73">

            <animateTransform attributeName="transform" type="translate" dur="1.5s" values="90,90;-10,-10;90,90" repeatCount="indefinite" />

            <animateTransform attributeName="transform" additive="sum" type="scale" dur="1.5s" values=".1;1.1;.1" repeatCount="indefinite" />
          </polygon>

          <circle className="maincircle" cx="95.5" cy="95.5" r="75" />

          <circle className="dashedline" cx="95.5" cy="95.5" r="95">
            <animateTransform attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 95.5 95.5"
              to="360 95.5 95.5"
              dur="10s"
              repeatCount="indefinite" />
          </circle>
          <circle className="reddot" cx="95.5" cy="95.5" r="25">
            <animate attributeType="xml"
              attributeName="r"
              from="0"
              to="75"
              dur="1.7s"
              repeatCount="indefinite" />
          </circle>
          <circle className="inring" cx="95.5" cy="95.5" r="75">
            <animate attributeType="xml"
              attributeName="r"
              from="0"
              to="75"
              dur="1.1s"
              repeatCount="indefinite" />
          </circle>

          <g>
            <path className="hammerhead hammer" d="M73.16,50.24l0.19,15.69s-0.08,4.21,2.77,3.35c3.44-1,6.77-1.5,7.83-3.87,0,0,.42-1.2,2.87-1.24L90.15,64s1.9-.31,1.63,2.56L91.7,69.42s-0.31,2.08,1.47,2.08h13a1.78,1.78,0,0,0,1.32-2.27,13.71,13.71,0,0,1-.08-4.43s13.92-1.6,20.56,5.81c0,0,3.19,5.39.79-1.55-2.48-7.16-15.29-20.87-45.29-14.66V50.9s1.07-1.55-1.56-1.86l-7.1-1S72.93,47.72,73.16,50.24Z" transform="translate(-4.5 -4.5)" />
            <path className="handle hammer" d="M94.06,71h11.13a2.73,2.73,0,0,1,2.73,2.72L108,144.9a2.43,2.43,0,0,1-2.43,2.43H94a2.56,2.56,0,0,1-2.56-2.56V73.67A2.67,2.67,0,0,1,94.06,71Z" transform="translate(-4.5 -4.5)" />

            <animateTransform attributeName="transform" additive="sum" type="rotate" dur="1.5s" values="350 95.5 95.5;250,95.5 95.5;350 95.5 95.5" repeatCount="indefinite" />

          </g>
        </svg>
    );
  }
}

export default UnderConstruction;