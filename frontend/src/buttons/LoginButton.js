import React from 'react';
import styled from 'styled-components';
import LoginIcon from '@mui/icons-material/Login';

const LoginButton = () => {
  return (
    <StyledWrapper>
      <button className='flex justify-center items-center font-bold'>
        Login <LoginIcon style={{ fontSize: "20px",marginRight:"3px",marginLeft:"5px" }} /> 
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    width: 100px;
    height: 38px;
    color: white;
    border: 2px solid #efa92a;
    border-radius: 45px;
    transition: all 0.3s;
    cursor: pointer;
    background: #efa92a;
    font-size: 1em;
    font-weight: 400;
  }

  button:hover {
    background: white;
    color: #efa92a;
    font-size: 1.1em;
  }
`;

export default LoginButton;
