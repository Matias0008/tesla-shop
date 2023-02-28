import { useState } from "react";

import { Box, Typography } from "@mui/material";

import { useProducts } from "@/hooks";
import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullscreenLoading, Pagination } from "@/components/ui";
import { Filters } from "@/components/products/Filters";
import { ISizes } from "@/interfaces";

const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState<ISizes>("all");
  const { products, pages, isLoading } = useProducts(
    `/products?page=${page}&size=${size}`
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onSizeChange = (size: ISizes) => {
    setSize(size);
  };

  return (
    <ShopLayout
      title="Productos | Tesla"
      pageDescription="Todos los productos de ropa que vende Tesla"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" component="h2" mb={2}>
        Todos los productos
      </Typography>
      {isLoading ? (
        <FullscreenLoading />
      ) : (
        <Box display="flex" gap={4} flexDirection={{ xs: "column", lg: "row" }}>
          <Filters
            onSizeChange={(size) => onSizeChange(size)}
            selectedSize={size}
          />
          <ProductList products={products} />
        </Box>
      )}
      <Pagination pages={pages} page={page} handleChange={handleChange} />
    </ShopLayout>
  );
};

export default ProductsPage;
