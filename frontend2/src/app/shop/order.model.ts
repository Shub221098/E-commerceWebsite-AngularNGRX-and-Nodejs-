export interface Orders {
    items: OrderItem[] | null;
    name: string;
    email: string;
    totalPrice :number;
    totalQuantity : number;
    totalItems : number;

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