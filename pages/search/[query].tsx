import { GetServerSideProps } from "next";

import { Box, Typography } from "@mui/material";

import { dbProducts } from "@/database";
import { IProduct, Product } from "@/interfaces";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";

interface Props {
  products: Product[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: React.FC<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title="Search | Tesla-Shop"
      pageDescription={"Encuentra los mejores productos de Tesla aqui"}
    >
      <Typography variant="h1" component="h1">
        Buscar producto
      </Typography>
      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 2 }} textTransform="capitalize">
          Termino: {query}
        </Typography>
      ) : (
        <Box display="flex" gap={0.5}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            No se encontraron resultados para:
          </Typography>
          <Typography variant="h2" sx={{ mb: 2 }} textTransform="capitalize">
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };
  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    console.log("no se encontro el producto");
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};
