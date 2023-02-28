import { IGender, ISizes } from "./products";

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size?: ISizes;
  slug: string;
  title: string;
  gender: IGender;
  quantity: number;
}
