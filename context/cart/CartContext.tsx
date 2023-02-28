import { createContext } from "react";

import { ICartProduct, ShippingAddress } from "@/interfaces";

interface Context {
  //* ==> Variables
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;
  isLoaded: boolean;
  shippingAddress?: ShippingAddress;
  //* ==> Metodos
  updateAddress: (address: ShippingAddress) => void;
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct, newQuantity: number) => void;
  deleteItemFromCart: (product: ICartProduct) => void;
  //* ==> Ordenes
  createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const CartContext = createContext({} as Context);
