import React from 'react';
import styled from 'styled-components';

const ChangeRoleButton = () => {
  return (
    <StyledWrapper>
      <button className="button" style={{ '--clr': '#7808d0' }}>
        Change Role
        <span className="button__icon-wrapper">
          <svg
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="button__icon-svg"
            width={10}
          >
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            />
          </svg>
          <svg
            viewBox="0 0 14 15"
            fill="none"
            width={10}
            xmlns="http://www.w3.org/2000/svg"
            className="button__icon-svg button__icon-svg--copy"
          >
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    line-height: 0.8;
    text-decoration: none;
    display: inline-flex;
    border: 1px solid #efa92a;
    cursor: pointer;
    align-items: center;
    gap: 0.75rem;
    background-color: white;
    color: #efa92a;
    border-radius: 10rem;
    font-weight: 600;
    padding: 0.5rem 0.8rem;
    padding-right: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s;
  }

  .button__icon-wrapper {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    position: relative;
    color: #efa92a;
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .button:hover {
    background-color: #efa92a;
    color : white;
  }

  .button:hover .button__icon-wrapper {
    color: #efa92a;
  }

  .button__icon-svg--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button:hover .button__icon-svg:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  .button:hover .button__icon-svg--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }
`;

export default ChangeRoleButton;
