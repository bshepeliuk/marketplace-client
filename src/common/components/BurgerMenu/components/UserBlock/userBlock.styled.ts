import { MdExitToApp } from 'react-icons/md';
import styled from 'styled-components';

export const Wrap = styled.div`
  display: grid;
  padding: 20px;
  grid-template-areas:
    'LOGO FULL-NAME LOGOUT'
    'LOGO EMAIL LOGOUT'
    'LOGO ROLE LOGOUT';
`;

export const LogoWrap = styled.div`
  grid-area: LOGO;
  justify-self: center;
  align-self: center;
`;

export const LogoutIcon = styled(MdExitToApp)`
  grid-area: LOGOUT;
  font-size: 20px;
  color: #fff;
  align-self: center;
  justify-self: end;
  cursor: pointer;
  grid-row: 1;
`;

export const FullName = styled.h1`
  grid-area: FULL-NAME;
  margin: 0;
  font-size: 20px;
  text-transform: uppercase;
  color: #dfe4ea;
  align-self: end;
`;

export const Email = styled.p`
  grid-area: EMAIL;
  margin: 0;
  color: #ced6e0;
`;

export const Role = styled.p`
  grid-area: ROLE;
  margin: 0;
  color: #7f8fa6;
  align-self: end;
  font-weight: bold;
`;
