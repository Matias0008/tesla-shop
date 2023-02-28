export interface IProduct {
  pages: number;
  products: Product[];
}

export interface Product {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ITypes;
  gender: IGender;
  createdAt: string;
  updatedAt: string;
}

export type ISizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "all";
export type ITypes = "shirts" | "pants" | "hoodies" | "hats";
export type IGender = "all" | "men" | "women" | "kid" | "unisex";
