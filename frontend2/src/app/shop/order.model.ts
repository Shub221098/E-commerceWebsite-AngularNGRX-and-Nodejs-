import { OrderItem } from "./shop.model";

export interface Orders {
    items: OrderItem[] | null;
    totalPrice :number;
    totalQuantity : number;
    totalItems : number;
  }
  