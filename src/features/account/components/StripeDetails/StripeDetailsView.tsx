import React from 'react';
import useActivateStripeSellerAccount from '@common/hooks/useActivateStripeSellerAccount';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { ActivateButton, Disabled, Enabled, StripeWrap, Title } from '../../styles/stripeDetails.styled';

function StripeDetailsView() {
  const { stripeAccount } = useTypedSelector((state) => state.auth);
  const { activate, isProcessing } = useActivateStripeSellerAccount();

  const hasActiveStripeAccount = stripeAccount !== null && stripeAccount.isActive;

  return (
    <StripeWrap>
      <Title>Stripe account</Title>
      <StripeAccountStatus isActive={hasActiveStripeAccount} />

      {!hasActiveStripeAccount && (
        <ActivateButton type="button" onClick={activate} disabled={isProcessing}>
          activate
        </ActivateButton>
      )}
    </StripeWrap>
  );
}

interface IStatusProps {
  isActive: boolean;
}

function StripeAccountStatus({ isActive }: IStatusProps) {
  return isActive ? <Enabled>enabled</Enabled> : <Disabled>disabled</Disabled>;
}

export default StripeDetailsView;
