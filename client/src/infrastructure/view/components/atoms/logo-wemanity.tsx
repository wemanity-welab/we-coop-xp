import React from 'react';
import styled from 'styled-components';
import imageLogo from '../../../../styles/wemanity-logo.png';

export const Logo = () => {
  return (
    <div className="Logo">
      <img src={imageLogo} alt="wemanity" />
    </div>
  );
};
