export interface Shop {
  items: OrderItem[];
}

export interface OrderItem {
  _id: string;
  productId: string;
  productName: string;
  totalProductQuantity: number;
  totalProductPrice: number;
  totalProductDiscountPrice: number;
  totalAvailableStock : number
}
