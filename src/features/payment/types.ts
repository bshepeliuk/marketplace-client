interface ProductData {
  name: string;
  description: string;
  images: string[];
}

interface PriceData {
  currency: string;
  unit_amount: number;
  product_data: ProductData;
}

export interface IPaymentItems {
  quantity: number;
  price_data: PriceData;
}
