import { useState, useContext, useEffect } from "react";

import { Box, Pagination as MuiPagination, Typography } from "@mui/material";

import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

import { FilterContext } from "@/context/filters";
import { useProducts } from "@/hooks";

import { Pagination, FullscreenLoading } from "@/components/ui";
import { ProductList } from "@/components/products";
import { ShopLayout } from "@/components/layouts";
import { Filters } from "@/components/products";

const KidCategoryPage = () => {
  const { filters } = useContext(FilterContext);
  const [page, setPage] = useState(1);
  const { products, pages, isLoading } = useProducts(
    `/products?page=${page}&size=${(filters as any)["size"]}&gender=kid`
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
        Categoria: Niños
      </Typography>
      {isLoading ? (
        <FullscreenLoading />
      ) : (
        <Box display="flex" gap={4} flexDirection={{ xs: "column", lg: "row" }}>
          <Filters products={products} />
          {products.length > 0 ? (
            <ProductList products={products} />
          ) : (
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              flexDirection="column"
            >
              <ProductionQuantityLimitsIcon fontSize="large" color="error" />
              <h1>No hay productos con ese talle</h1>
            </Box>
          )}
        </Box>
      )}
      {products.length > 0 && (
        <Pagination page={page} pages={pages} handleChange={handleChange} />
      )}
    </ShopLayout>
  );
};

export default KidCategoryPage;
