import { useState } from "react";

import { Box, Pagination as MuiPagination, Typography } from "@mui/material";

import { useProducts } from "@/hooks";
import { ISizes } from "@/interfaces";
import { Pagination, FullscreenLoading } from "@/components/ui";
import { ProductList } from "@/components/products";
import { ShopLayout } from "@/components/layouts";
import { Filters } from "@/components/products";

const WomenCategoryPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState<ISizes>("all");
  const { products, pages, isLoading } = useProducts(
    `/products?page=${page}&size=${size}&gender=women`
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onSizeChange = (size: ISizes) => {
    setSize(size);
  };

  return (
    <ShopLayout
      title="Men clothes | Tesla-Shop"
      pageDescription="Ropa para la categoria de hombres, de Tesla-Shop"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Categoria: hombre
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
      <Pagination page={page} pages={pages} handleChange={handleChange} />
    </ShopLayout>
  );
};

export default WomenCategoryPage;
