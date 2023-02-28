import { useState } from "react";

import { Pagination as MuiPagination, Typography } from "@mui/material";

import { useProducts } from "@/hooks";
import { Pagination, FullscreenLoading } from "@/components/ui";
import { ProductList } from "@/components/products";
import { ShopLayout } from "@/components/layouts";

const WomenCategoryPage = () => {
  const [page, setPage] = useState(1);
  const { products, pages, isLoading } = useProducts(
    `/type/shirts?page=${page}`
  );
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <ShopLayout
      title="Shirts | Tesla-Shop"
      pageDescription="Remeras en venta, de Tesla-Shop"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Categoria: remeras
      </Typography>
      {isLoading ? <FullscreenLoading /> : <ProductList products={products} />}
      <Pagination page={page} pages={pages} handleChange={handleChange} />
    </ShopLayout>
  );
};

export default WomenCategoryPage;
