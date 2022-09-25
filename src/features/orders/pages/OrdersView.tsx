import React, { useEffect } from 'react';
import { Orders } from '@src/common/api/Api';

function OrdersView() {
  useEffect(() => {
    const get = async () => {
      await Orders.get();
    };

    get();
  }, []);

  return <div>Orders will be here.</div>;
}

export default OrdersView;
