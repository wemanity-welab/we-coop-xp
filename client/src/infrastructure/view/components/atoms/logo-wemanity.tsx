import React from 'react';
import styled from 'styled-components';
import imageLogo from '../../../../styles/wemanity-logo.png';

export const Logo = () => {
  return <img src={imageLogo} alt="wemanity" />;
};

export const styledLogo = styled(Logo)`
  border: 5px solid red;
`;
