import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="button">
        BUY NOW
        <svg fill="none" viewBox="0 0 24 24" height={24} width={24} xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_30_96)">
            <path fill="white" d="M0.479167 11.5C0.203024 11.5 -0.0208333 11.7239 -0.0208333 12C-0.0208333 12.2761 0.203024 12.5 0.479167 12.5V11.5ZM22.9231 12.3536C23.1184 12.1583 23.1184 11.8417 22.9231 11.6464L19.7411 8.46447C19.5459 8.2692 19.2293 8.2692 19.034 8.46447C18.8388 8.65973 18.8388 8.97631 19.034 9.17157L21.8625 12L19.034 14.8284C18.8388 15.0237 18.8388 15.3403 19.034 15.5355C19.2293 15.7308 19.5459 15.7308 19.7411 15.5355L22.9231 12.3536ZM0.479167 12.5H22.5696V11.5H0.479167V12.5Z" />
          </g>
          <defs>
            <clipPath id="clip0_30_96">
              <rect fill="white" height={24} width={24} />
            </clipPath>
          </defs>
        </svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    border-radius: 8px;
    border: 1px solid #fff;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(15px);
    position: relative;
    transition: all 0.3s ease-in-out;

    padding-block: 0.5rem;
    padding-inline: 1.25rem;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ffff;
    gap: 10px;

    outline: none;
    overflow: hidden;
    font-size: 15px;
  }

  .icon {
    width: 24px;
    height: 24px;
    transition: all 0.3s ease-in-out;
  }

  .button:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.5);
  }

  .button:hover .icon {
    transform: translate(4px);
  }

  .button:hover::before {
    animation: shine 1s ease-out infinite;
  }

  .button::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
    );
    top: 0;
    left: -100px;
    opacity: 0.6;
  }

  @keyframes shine {
    0% {
      left: -100px;
    }

    60% {
      left: 100%;
    }

    to {
      left: 100%;
    }
  }`;

export default Button;
