import React from 'react';
import styled from 'styled-components';

const ContinueShopping = () => {
  return (
    <StyledWrapper>
      <button>
        <span>Continue Shopping</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   display: inline-block;
   border-radius: 4px;
   background-color: #efa92a;
   border: none;
   color: #FFFFFF;
   text-align: center;
   font-size: 17px;
   padding: 12px;
   width: 230px;
   transition: all 0.5s;
   cursor: pointer;
   margin: 5px;
  }

  button span {
   cursor: pointer;
   display: inline-block;
   position: relative;
   transition: 0.5s;
  }

  button span:after {
   content: '»';
   position: absolute;
   opacity: 0;
   top: 0;
   right: -15px;
   transition: 0.5s;
  }

  button:hover span {
   padding-right: 15px;
  }

  button:hover span:after {
   opacity: 1;
   right: 0;
  }`;

export default ContinueShopping;
