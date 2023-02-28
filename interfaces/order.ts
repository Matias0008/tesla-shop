import { IUser } from "./";

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: ShippingAddress;
  paymentResult?: string;
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
  transactionId?: string;
  createdAt?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: string;
  slug: string;
  quantity: number;
  image: string;
  price: number;
  gender: string;
}

export interface ShippingAddress {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  zip: string;
}
