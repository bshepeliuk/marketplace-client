import React from 'react';
import HeaderView from '@src/common/components/Header/HeaderView';

function PaymentCheckoutCancel() {
  return (
    <>
      <HeaderView />
      <div>
        Payment failed. Something went wrong. Kindly recheck your credentials.
      </div>
    </>
  );
}

export default PaymentCheckoutCancel;
