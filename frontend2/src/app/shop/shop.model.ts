export interface Shop {
  _id: string;
  items: OrderItem[];
  userId: string;
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
