import React from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useLogout from '@src/features/auth/hooks/useLogout';
import UserLogo from '../../../UserLogo/UserLogo';
import {
  Email,
  FullName,
  LogoutIcon,
  LogoWrap,
  Role,
  Wrap,
} from './userBlock.styled';

function UserBlockView() {
  const { user } = useTypedSelector((state) => state.auth);
  const { onLogout } = useLogout();

  if (user === null) return null;

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
