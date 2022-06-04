import React from 'react';
import styled from 'styled-components';
import HeaderView from '@src/common/components/Header/HeaderView';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { Payment } from '@src/common/api/Api';

const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Role = styled.p`
  color: rgba(26, 188, 156, 1);
  margin-bottom: 0;
  border: 1px solid rgba(26, 188, 156, 1);
  border-radius: 4px;
  padding: 5px 10px;
  margin: 0;
`;

const StripeWrap = styled.div`
  display: flex;
  align-items: center;
`;

const UserWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Enabled = styled.div`
  border: 1px solid #1abc9c;
  background-color: #1abc9c;
  border-radius: 4px;
  padding: 5px 10px;
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
`;

const Disabled = styled.div`
  border: 1px solid #e74c3c;
  background-color: #e74c3c;
  border-radius: 4px;
  padding: 5px 10px;
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
`;

const ROLES = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
} as const;

function AccountView() {
  const { user, stripeAccount } = useTypedSelector((state) => state.auth);
  // prettier-ignore
  const hasActiveStripeAccount = stripeAccount !== null && stripeAccount.isActive;

  const activate = async () => {
    try {
      const res = await Payment.activateStripeAccount();

      window.location.href = res.data.accountLink;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error });
    }
  };

  return (
    <>
      <HeaderView />
      <Wrap>
        <UserWrap>
          <h1>{user?.fullName}</h1>
          <Role>{user?.role}</Role>
        </UserWrap>

        {user?.role === ROLES.SELLER && (
          <StripeWrap>
            <h1>Stripe account</h1>
            {hasActiveStripeAccount ? (
              <Enabled>enabled</Enabled>
            ) : (
              <Disabled>disabled</Disabled>
            )}

            {!hasActiveStripeAccount && (
              <button type="button" onClick={activate}>
                activate
              </button>
            )}
          </StripeWrap>
        )}
      </Wrap>
    </>
  );
}

export default AccountView;
