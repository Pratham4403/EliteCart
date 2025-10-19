import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GooglePlayButton = () => {
  return (
    <StyledWrapper>
      <Link className="playstore-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="icon" viewBox="0 0 512 512">
          <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z" />
        </svg>
        <span className="texts">
          <span className="text-1">GET IT ON</span>
          <span className="text-2">Google Play</span>
        </span>
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .playstore-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #efa92a;
    border-radius: 9999px;
    background-color: white;
    padding: 0.625rem 1.1rem;
    text-align: center;
    color: #efa92a;
    outline: 0;
    transition: all  .2s ease;
    text-decoration: none;
    height : 45px;
    margin-right : 10px;
  }

  .playstore-button:hover {
    background-color: #efa92a;
    color: white;
  }

  .icon {
    height: 1.5rem;
    width: 1.5rem;
  }

  .texts {
    margin-left: 0.7rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1;
  }

  .text-1 {
    margin-bottom: 0.05rem;
    font-size: 0.53rem;
    line-height: 0.6rem;
  }

  .text-2 {
    font-weight: 600;
  }`;

export default GooglePlayButton;
