import React from 'react';
import styled from 'styled-components';

const AddToCartButton1 = () => {
  return (
    <StyledWrapper>
      <div className="button">
        <div className="button-wrapper">
          <div className="text">Add To Cart</div>
          <span className="icon">
            <svg
              viewBox="0 0 16 16"
              className="bi bi-cart2"
              fill="currentColor"
              height={16}
              width={16}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
          </span>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    --width: 140px;
    --height: 45px;
    --button-color: #222;
    width: var(--width);
    height: var(--height);
    background: #eda012;
    position: relative;
    text-align: center;
    border-radius: 0.45em;
    transition: background 0.3s;
  }

  .text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size : 15px;
    font : bold;
  }

  .button-wrapper,
  .text,
  .icon {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    color: #fff;
  }

  .text {
    top: 0;
  }

  .text,
  .icon {
    transition: top 0.5s;
  }

  .icon {
    color: #fff;
    top: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon svg {
    width: 24px;
    height: 24px;
  }

  .button:hover {
    background: #eda012;
  }

  .button:hover .text {
    top: -100%;
  }

  .button:hover .icon {
    top: 0;
  }
`;

export default AddToCartButton1;
