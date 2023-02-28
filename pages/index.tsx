import NextLink from "next/link";

import { Box, Card, CardMedia, Chip, Grid, Link, Typography } from "@mui/material";

import { useProducts } from "@/hooks";
import { ShopLayout } from "@/components/layouts";
import { FullscreenLoading } from "@/components/ui";
import { ProductList } from "@/components/products";

export default function Home() {
  let { products, isLoading } = useProducts(`/products`);

  return (
    <ShopLayout
      title="Home | Tesla-Shop"
      pageDescription={"Encuentra los mejores productos de Tesla aqui"}
    >
      <Grid container spacing={{ xs: 3, md: 8 }} mb={{ xs: 3, md: 6 }}>
        <Grid item xs={12} md={6} display="flex" justifyContent={{ xs: "start", md: "center" }}>
          <Card sx={{ height: { xs: 300, md: 800 }, width: "100%" }}>
            <Chip
              sx={{
                position: "absolute",
                borderRadius: 0,
                zIndex: 99,
                fontSize: { xs: 15, md: 30 },
                padding: "20px 0px 20px 0px",
              }}
              color="primary"
              label="Remeras"
            />
            <NextLink href="/category/shirts" legacyBehavior passHref>
              <Link>
                <CardMedia
                  height="100%"
                  component="img"
                  image="/products/1741416-00-A_0_2000.jpg"
                  sx={{
                    scale: 1,
                    "&:hover": {
                      transform: "scale(1.10)",
                    },
                    transition: "all .3s ease-out",
                    objectPosition: { xs: "center", sm: "0% 20%", md: "center" },
                  }}
                />
              </Link>
            </NextLink>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent={{ xs: "start", md: "center" }}>
          <Card sx={{ height: { xs: 300, md: 800 }, width: "100%" }}>
            <Chip
              sx={{
                position: "absolute",
                borderRadius: 0,
                zIndex: 99,
                fontSize: { xs: 15, md: 30 },
                padding: "20px 0px 20px 0px",
              }}
              color="primary"
              label="Abrigos"
            />
            <NextLink href="/category/jackets" legacyBehavior passHref>
              <Link>
                <CardMedia
                  component="img"
                  image="/products/1740176-00-A_0_2000.jpg"
                  height="100%"
                  sx={{
                    scale: 1,
                    "&:hover": {
                      transform: "scale(1.10)",
                    },
                    transition: "all .3s ease-out",
                    objectPosition: { xs: "center", sm: "0% 20%", md: "center" },
                  }}
                />
              </Link>
            </NextLink>
          </Card>
        </Grid>
      </Grid>
      {isLoading ? <FullscreenLoading /> : <ProductList products={products.slice(0, 8)} />}

      <Box mt={4} display="flex" justifyContent="center">
        <NextLink href="/products" passHref legacyBehavior>
          <Link>
            <Typography
              padding={1}
              sx={{ background: "#4a4a4a", color: "white" }}
              minWidth={{ xs: 300, md: 400 }}
              maxWidth={"100%"}
              variant="subtitle1"
              textAlign="center"
            >
              Ver todos los productos
            </Typography>
          </Link>
        </NextLink>
      </Box>
    </ShopLayout>
  );
}
