import { useContext, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { dbProducts } from "@/database";
import { CartContext } from "@/context/cart";
import { ICartProduct, ISizes, Product } from "@/interfaces";

import { ProductSlideshow, SizeSelector } from "@/components/products";
import { ItemCounter, Price, Text } from "@/components/ui";
import { SlugLayout } from "@/components/layouts";
import { VALID_SIZES } from "@/constants";

interface Props {
  product: Product;
}

const SlugPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;
    addProductToCart(tempCartProduct);
    router.push("/cart");
  };

  const onSizeChange = (size: ISizes) => {
    if (!VALID_SIZES.includes(size)) {
      return;
    }

    setTempCartProduct({
      ...tempCartProduct,
      size,
    });
  };

  const onQuantityChange = (quantity: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity,
    });
  };

  return (
    <SlugLayout
      title={`${product.title.substring(0, 15)}... | Tesla-Shop`}
      pageDescription="Descripcion del producto"
      usePadding={false}
    >
      <Grid container spacing={{ xs: 1, lg: 3 }}>
        {/* Product images */}
        <Grid item xs={12} md={7.5}>
          <Box
            paddingLeft={{ xs: "0", md: "36px" }}
            paddingTop={{ xs: "0", md: "36px" }}
            paddingBottom={{ xs: "0", md: "36px" }}
          >
            <ProductSlideshow images={product.images} />
          </Box>
        </Grid>

        {/* All product description */}
        <Grid item xs={12} md={4.5} pr={{ lg: 1 }}>
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            padding={{ xs: "28px", sm: "36px" }}
          >
            <Box>
              <Typography
                variant="h1"
                component="h1"
                mb={1}
                fontSize={{ xs: "25px", lg: "30px" }}
              >
                {product.title}
              </Typography>
              <Price
                sx={{
                  backgroundColor: "#cbcbcb",
                  paddingLeft: 0.5,
                  paddingRight: 0.5,
                  width: "fit-content",
                }}
              >
                $ {product.price}
              </Price>
            </Box>

            <SizeSelector
              selectedSize={tempCartProduct.size}
              sizes={product.sizes}
              onSizeChange={(size: ISizes) => onSizeChange(size)}
            />

            <Box display="flex" gap={2} flexWrap="wrap">
              <Box sx={{ width: { xs: "initial", md: "100%", lg: "initial" } }}>
                <ItemCounter
                  currentValue={tempCartProduct.quantity}
                  maxValue={product.inStock}
                  onQuantityChange={(quantity: number) =>
                    onQuantityChange(quantity)
                  }
                  slugMode
                />
              </Box>
              {product.inStock === 0 ? (
                <Chip
                  label="No hay disponibles"
                  color="error"
                  variant="outlined"
                  sx={{
                    minWidth: 160,
                    flex: 1,
                    fontSize: 16,
                    height: "unset",
                  }}
                />
              ) : (
                <Button
                  color="secondary"
                  className="circular-btn"
                  onClick={onAddProduct}
                  sx={{
                    borderRadius: "0px !important",
                    minWidth: 160,
                    maxWidth: 400,
                    flex: 1,
                  }}
                >
                  {tempCartProduct.size
                    ? "Agregar al carrito"
                    : "Seleccione un talle"}
                </Button>
              )}
            </Box>

            <Box>
              <Typography fontWeight={700}>Descripción</Typography>
              <Text>{product.description}</Text>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </SlugLayout>
  );
};

export default SlugPage;

export async function getStaticPaths() {
  const slugs = await dbProducts.getAllProductsSlug();
  const paths = slugs.map((slug) => ({
    params: slug,
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { product },
    revalidate: 86400,
  };
};
