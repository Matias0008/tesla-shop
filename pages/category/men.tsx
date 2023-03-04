import { useState, useContext } from "react";

import { Box, Pagination as MuiPagination, Typography } from "@mui/material";

import { FilterContext } from "@/context/filters";
import { useProducts } from "@/hooks";

import { Pagination, FullscreenLoading } from "@/components/ui";
import { ProductList } from "@/components/products";
import { ShopLayout } from "@/components/layouts";
import { Filters } from "@/components/products";

const MenCategoryPage = () => {
  const { filters } = useContext(FilterContext);
  const [page, setPage] = useState(1);
  const { products, pages, isLoading } = useProducts(
    `/products?page=${page}&size=${(filters as any)["size"]}&gender=men`
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
        Categoria: Hombre
      </Typography>
      {isLoading ? (
        <FullscreenLoading />
      ) : (
        <Box display="flex" gap={4} flexDirection={{ xs: "column", lg: "row" }}>
          <Filters />
          <ProductList products={products} />
        </Box>
      )}
      <Pagination page={page} pages={pages} handleChange={handleChange} />
    </ShopLayout>
  );
};

export default MenCategoryPage;
