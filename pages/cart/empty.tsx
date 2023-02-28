import NextLink from "next/link";
import { Box, Link, Typography } from "@mui/material";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";

import { ShopLayout } from "@/components/layouts";

const CartEmptyPage = () => {
  return (
    <ShopLayout
      title="Carrito vacio | Tesla Shop"
      pageDescription="Su carrito de compras se encuentra vacio"
    >
      <Box
        sx={{ minHeight: "300px" }}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        gap={3}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 120 }} />
        <Box display="flex" alignItems="center" flexDirection="column">
          <Typography variant="h2">Su carrito está vacio</Typography>
          <NextLink href="/" passHref legacyBehavior>
            <Link typography="h6" color="secondary">
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default CartEmptyPage;
