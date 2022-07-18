import React from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { ROLES } from '@src/common/constants';
import StripeDetailsView from '../components/StripeDetails/StripeDetailsView';
import { Container, Role, UserWrap, FullName } from '../styles/account.styled';

function AccountView() {
  const { user } = useTypedSelector((state) => state.auth);

  const isSellerRole = user?.role === ROLES.SELLER;

  return (
    <Container>
      <UserWrap>
        <FullName>{user?.fullName}</FullName>
        <Role>{user?.role}</Role>
      </UserWrap>

      {isSellerRole && <StripeDetailsView />}
    </Container>
  );
}

export default AccountView;
