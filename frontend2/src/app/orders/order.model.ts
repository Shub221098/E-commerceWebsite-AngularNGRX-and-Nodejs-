import { OrderItem } from '../shop/shop.model';
export interface Orders {
  items: OrderItem[] | null;
  totalPrice: number;
  totalQuantity: number;
  totalItems: number;
  status?: string;
  createdAt?: string;
  userId?: string;
  _id?: string;
}
