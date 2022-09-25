import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogout from '@features/auth/hooks/useLogout';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useCheckUserRole from '@common/hooks/useCheckUserRole';
import { routes } from '@src/app/Router';
import { AccountLink, ArrowIcon, Email, InfoWrap, Logout, Role, UserWrap } from './userInfo.styled';
import UserLogo from '../UserLogo/UserLogo';

function UserInfoView() {
  const [isVisible, setIsVisible] = useState(false);
  const { onLogout } = useLogout();
  const { isLoggedIn, user } = useTypedSelector((state) => state.auth);
  const { isSeller, isBuyer } = useCheckUserRole();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const onMouseLeave = () => setIsVisible(false);

  if (!user || !isLoggedIn) return null;

  return (
    <UserWrap>
      <UserLogo fullName={user.fullName} size={50} />
      <ArrowIcon data-button="user-info" onClick={toggleVisibility} isOpen={isVisible} />

      {isVisible && (
        <InfoWrap onMouseLeave={onMouseLeave}>
          <div>
            <AccountLink to={routes.account}>{user.fullName}</AccountLink>
            <Email>{user.email}</Email>

            {isSeller && <Link to={routes.orders}>My orders</Link>}
            {isBuyer && <Link to={routes.purchases}>My purchases</Link>}

            <Role>{user.role}</Role>
          </div>

          <Logout onClick={onLogout} />
        </InfoWrap>
      )}
    </UserWrap>
  );
}

export default UserInfoView;
