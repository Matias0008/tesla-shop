import { useContext, useState } from "react";
import NextLink from "next/link";

import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import { CartContext } from "@/context/cart";

import { ShopLayout } from "@/components/layouts";
import { CartList } from "@/components/cart";
import { OrderSummary } from "@/components/cart";
import { useRouter } from "next/router";

const SummaryPage = () => {
  const router = useRouter();
  const { numberOfItems, createOrder } = useContext(CartContext);
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
    }

    //* ==> Aca el message seria igual al ID de nuestra orden
    router.replace(`/orders/${message}`);
  };

  return (
    <ShopLayout
      title={`Resumen del pedido - ${numberOfItems} | Tesla-Shop`}
      pageDescription="Carrito de compras en la tienda"
    >
      <Box
        display="flex"
        minHeight={"500px"}
        justifyContent="center"
        alignItems="center"
      >
        <Grid container maxWidth={1400} margin="0 auto">
          {/* Grid item for the cart list */}
          <Grid item xs={12} md={7} bgcolor="#efefef" padding={"32px"}>
            <Typography
              variant="h1"
              component="h1"
              fontWeight={500}
              sx={{ mb: 3 }}
              textAlign={{ xs: "center", md: "start" }}
            >
              Resumen del pedido
            </Typography>
            <CartList titleBold />
          </Grid>
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
            <Box bgcolor="#efefef" padding={"32px"}>
              <Typography fontSize={20} fontWeight="bold">
                Resumen ({numberOfItems})
              </Typography>
              <Divider sx={{ mb: 2, mt: 1 }} />
              <OrderSummary />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              rowGap={1}
              sx={{ mt: 3 }}
              flexDirection={{ xs: "column", lg: "row-reverse" }}
            >
              <Link sx={{ width: { xs: "100%", xl: "initial" } }}>
                <Button
                  color="primary"
                  className="circular-btn"
                  size="large"
                  fullWidth
                  sx={{ fontSize: 19 }}
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Confirmar orden
                </Button>
              </Link>
              <NextLink href="/cart" passHref legacyBehavior>
                <Link sx={{ width: { xs: "100%", xl: "initial" } }}>
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 400, fontSize: 19 }}
                    size="large"
                    fullWidth
                  >
                    Volver a tu carrito
                  </Button>
                </Link>
              </NextLink>
            </Box>
            <Chip
              label={errorMessage}
              color="error"
              sx={{
                width: "100%",
                mt: 2,
                fontSize: 19,
                padding: 2.5,
                display: errorMessage ? "initial" : "none",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </ShopLayout>
  );
};

export default SummaryPage;
