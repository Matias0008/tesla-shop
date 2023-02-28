import { CartState } from "./";

import { ICartProduct, ShippingAddress } from "@/interfaces";

type CartActionType =
  | {
      type: "[Cart] - Load cart from cookies | storage";
      payload: ICartProduct[];
    }
  | {
      type: "[Cart] - Update products in cart";
      payload: ICartProduct[];
    }
  | {
      type: "[Cart] - Change cart quantity";
      payload: ICartProduct;
    }
  | {
      type: "[Cart] - Delete item from cart";
      payload: ICartProduct;
    }
  | {
      type: "[Cart] - Update order summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        taxRate: number;
        total: number;
      };
    }
  | {
      type: "[Cart] - Load shipping address from cookies";
      payload: ShippingAddress;
    }
  | {
      type: "[Cart] - Update address";
      payload: ShippingAddress;
    }
  | {
      type: "[Cart] - Order complete";
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - Update products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "[Cart] - Load cart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: action.payload,
      };

    case "[Cart] - Change cart quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
          return action.payload;
        }),
      };

    case "[Cart] - Delete item from cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            product._id !== action.payload._id ||
            (product._id === action.payload._id &&
              product.size !== action.payload.size)
        ),
      };

    case "[Cart] - Update order summary":
      return {
        ...state,
        ...action.payload,
      };

    case "[Cart] - Load shipping address from cookies": {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }

    case "[Cart] - Update address": {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }

    case "[Cart] - Order complete": {
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        total: 0,
        subTotal: 0,
        taxRate: 0,
      };
    }

    default:
      return state;
  }
};
