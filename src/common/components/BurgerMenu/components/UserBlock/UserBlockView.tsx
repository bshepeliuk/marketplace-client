import React from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { routes } from '@src/app/Router';
import useLogout from '@src/features/auth/hooks/useLogout';
import UserLogo from '../../../UserLogo/UserLogo';
import { Email, FullName, LoginLink, LogoutIcon, LogoWrap, Role, Wrap } from './userBlock.styled';

function UserBlockView() {
  const { user } = useTypedSelector((state) => state.auth);
  const { onLogout } = useLogout();

  if (user === null)
    return (
      <Wrap>
        <LoginLink to={routes.login}>Login to my account.</LoginLink>
      </Wrap>
    );

  return (
    <Wrap>
      <LogoWrap>
        <UserLogo fullName={user.fullName} size={70} />
      </LogoWrap>

      <FullName>{user.fullName}</FullName>
      <Email>{user.email}</Email>
      <Role>{user.role}</Role>
      <LogoutIcon onClick={onLogout} />
    </Wrap>
  );
}

export default UserBlockView;
