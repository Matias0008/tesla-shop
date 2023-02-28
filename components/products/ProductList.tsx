import { Box, Grid } from "@mui/material";

import { ISizes, Product } from "@/interfaces";

import { ProductCard } from "./ProductCard";
import { SizeSelector } from "./SizeSelector";
import { useState } from "react";

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <ProductCard product={product} key={product.title} />
        ))}
      </Grid>
    </>
  );
};
