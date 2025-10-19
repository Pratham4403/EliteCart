import React from 'react';
import styled from 'styled-components';

const LogoutButton = () => {
  return (
    <StyledWrapper>
      <button>Logout</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    width: 80px;
    height: 35px;
    color: #efa92a;
    border: 2px solid #efa92a;
    border-radius: 45px;
    transition: all 0.3s;
    cursor: pointer;
    background: white;
    font-size: 1em;
    font-weight: 400;
  }

  button:hover {
    background: #efa92a;
    color: white;
    font-size: 1.1em;
  }`;

export default LogoutButton;
