import React, { useState } from 'react';
import useLogout from '@features/auth/hooks/useLogout';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { routes } from '@src/app/Router';
import {
  AccountLink,
  ArrowIcon,
  Email,
  InfoWrap,
  Logout,
  LogoWrap,
  Role,
  UserWrap,
} from './userInfo.styled';

function UserInfoView() {
  const [isVisible, setIsVisible] = useState(false);
  const { onLogout } = useLogout();
  const { isLoggedIn, user } = useTypedSelector((state) => state.auth);

  const toggleVisibility = () => setIsVisible(!isVisible);

  if (!user || !isLoggedIn) return null;

  return (
    <UserWrap>
      <UserLogo fullName={user.fullName} />
      <ArrowIcon onClick={toggleVisibility} isOpen={isVisible} />

      {isVisible && (
        <InfoWrap>
          <div>
            <AccountLink to={routes.account}>{user.fullName}</AccountLink>
            <Email>{user.email}</Email>
            <Role>{user.role}</Role>
          </div>

          <Logout onClick={onLogout} />
        </InfoWrap>
      )}
    </UserWrap>
  );
}

function UserLogo({ fullName }: { fullName: string }) {
  return <LogoWrap>{fullName[0]}</LogoWrap>;
}

export default UserInfoView;
