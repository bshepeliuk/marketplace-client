import { useState } from 'react';
import * as Api from '@src/common/api/Api';

const useActivateStripeSellerAccount = () => {
  const [hasError, setHasError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const activate = async () => {
    try {
      setHasError(false);
      setIsProcessing(true);

      const res = await Api.Payment.activateStripeAccount();

      window.location.href = res.data.accountLink;
    } catch (error) {
      setHasError(true);
      setIsProcessing(false);
    }
  };

  return {
    activate,
    isProcessing,
    hasError,
  };
};

export default useActivateStripeSellerAccount;
