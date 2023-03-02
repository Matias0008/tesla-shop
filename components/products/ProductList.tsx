import Grid from "@mui/material/Grid";

import { Product } from "@/interfaces";

import { ProductCard } from "./ProductCard";

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
