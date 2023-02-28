import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { Box, Button, Divider, Grid, Link, Typography } from "@mui/material";

import { CartContext } from "@/context/cart";
import { ShopLayout } from "@/components/layouts";
import { CartList, Discount, OrderCheckout } from "@/components/cart";

const CartPage = () => {
  const router = useRouter();
  const { isLoaded, numberOfItems, cart } = useContext(CartContext);

  useEffect(() => {
    // Si ya trajimos el carrito de las cookies y esta vacio
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }

  return (
    <ShopLayout
      title={`Carrito de compras - ${numberOfItems} | Tesla-Shop`}
      pageDescription="Carrito de compras en la tienda"
    >
      <Box
        display="flex"
        minHeight={"300px"}
        justifyContent="center"
        alignItems="center"
      >
        <Grid container maxWidth={1400} margin="0 auto">
          {/* Grid item for the cart list */}
          <Grid
            item
            xs={12}
            md={7}
            boxShadow={{
              xs: "none",
              md: "rgb(0 0 0 / 10%) 0px 0px 5px 0px, rgb(0 0 0 / 10%) 0px 0px 1px 0px",
            }}
            padding={{ xs: "0px", md: "32px" }}
          >
            <Typography
              variant="h1"
              component="h1"
              fontWeight={550}
              sx={{ mb: 3 }}
              fontSize={{ xs: "30px", sm: "35px" }}
              textAlign={{ xs: "center", md: "initial" }}
            >
              Carrito de compras
            </Typography>
            <CartList editable cartListGap />
          </Grid>

          {/* Grid item for the divider */}
          <Grid
            item
            xs={12}
            md={1}
            display={{ xs: "initial", md: "flex" }}
            justifyContent={{ xs: "initial", md: "center" }}
          >
            <Divider
              orientation="vertical"
              sx={{ display: { xs: "none", md: "block" } }}
            />
            <Divider
              orientation="horizontal"
              sx={{ display: { xs: "block", md: "none" }, my: 3 }}
            />
          </Grid>

          {/* Grid item for the order summary */}
          <Grid item xs={12} md={4}>
            <Box position="sticky" top={"70px"}>
              <Box
                boxShadow={{
                  xs: "none",
                  md: "rgb(0 0 0 / 10%) 0px 0px 5px 0px, rgb(0 0 0 / 10%) 0px 0px 1px 0px",
                }}
                padding={{ xs: "0px", md: "32px" }}
              >
                <Typography
                  variant="h2"
                  fontFamily="Roboto"
                  fontWeight={550}
                  mb={{ xs: 2, md: 0 }}
                >
                  Orden
                </Typography>
                <Divider sx={{ my: 2, display: { xs: "none", md: "block" } }} />
                <Divider
                  sx={{ mt: 1, mb: 2, display: { xs: "none", md: "initial" } }}
                />
                <OrderCheckout />
                <Divider sx={{ my: 2, display: { xs: "block", md: "none" } }} />
              </Box>

              <Discount />
              <Divider sx={{ my: 3 }} />

              {/* Buttons*/}
              <Box
                display="flex"
                flexDirection={{ xs: "column", lg: "row-reverse" }}
                flexWrap="wrap"
                rowGap={1}
                sx={{ mt: 3 }}
                justifyContent={{ xs: "start", md: "space-between" }}
              >
                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link
                    sx={{
                      width: {
                        xs: "100%",
                        xl: "initial",
                      },
                    }}
                  >
                    <Button
                      color="secondary"
                      className="circular-btn"
                      size="large"
                      fullWidth
                      sx={{
                        fontSize: 19,
                      }}
                    >
                      Comprar
                    </Button>
                  </Link>
                </NextLink>

                <NextLink href="/products" passHref legacyBehavior>
                  <Link
                    sx={{
                      width: {
                        xs: "100%",
                        xl: "initial",
                      },
                    }}
                  >
                    <Button
                      color="primary"
                      variant="outlined"
                      sx={{
                        fontWeight: 400,
                        fontSize: 19,
                      }}
                      size="large"
                      fullWidth
                    >
                      Seguir comprando
                    </Button>
                  </Link>
                </NextLink>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ShopLayout>
  );
};

export default CartPage;
