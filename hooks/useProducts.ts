import useSWR, { SWRConfiguration } from "swr";

import { IProduct, Product } from "@/interfaces";

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IProduct>(`/api/${url}`, config);
  let dataProducts = {} as Product[];
  let pages = 0;

  if (data) {
    dataProducts = data.products;
    pages = data.pages;
  }

  return {
    pages,
    products: dataProducts || [],
    isLoading: !data && !error,
    isError: error,
  };
};
