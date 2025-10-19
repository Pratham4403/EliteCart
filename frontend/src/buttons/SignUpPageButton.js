import React from 'react';
import styled from 'styled-components';

const SignUpPageButton = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <span className="text">SignUp</span>
        <svg
          className="icon"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    background-color: #ffffff00;
    color: #efa92a;
    width: 8.0em;
    height: 2.6em;
    border: #efa92a 0.1em solid;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    transition: all 0.6s ease;
    font-weight: 600;
  }

  .button:hover {
    background-color: #efa92a;
    color: #fff;
    cursor: pointer;
  }

  .icon {
    width: 1.4em;
    height: 1.4em;
    transition: transform 0.4s ease;
  }

  .button:hover .icon {
    transform: translateX(5px);
  }

  .text {
    font-size: 1.1em;
  }
`;

export default SignUpPageButton;
