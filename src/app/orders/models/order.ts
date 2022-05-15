export interface Order {
  id: string;
  orderDate: string;
  createdBy: string;
  orderNo: string;
  productName: string;
  total: number;
  price: number;
  totalPrice: number;
}


export interface OrderDto {
  id: string;
}

export interface OrderViewModel {
  id: string;
  orderDate: string;
  createdBy: string;
  orderNo: string;
  productName: string;
  total: number;
  price: number;
  totalPrice: number;
}

export interface RegisterOrderRequest {
  orderDate: string;
  personEmail: string;
  orderNo: string;
  productName: string;
  total: number;
  price: number;
}
