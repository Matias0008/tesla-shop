import { useProducts } from "@/hooks";
import { Typography } from "@mui/material";
import { FullscreenLoading } from "@/components/ui/FullscreenLoading";
import { ProductList } from "@/components/products";
import { ShopLayout } from "@/components/layouts";

const JacketsCategoryPage = () => {
  const { products, isLoading } = useProducts("/type/jackets");

  return (
    <ShopLayout
      title="Abrigos | Tesla-Shop"
      pageDescription="Ropa para la categoria de mujeres, de Tesla-Shop"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Categoria: abrigos
      </Typography>
      {isLoading ? <FullscreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default JacketsCategoryPage;
