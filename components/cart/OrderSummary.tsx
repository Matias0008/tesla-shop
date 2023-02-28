import { useContext, useMemo } from "react";
import NextLink from "next/link";

import { Divider, Grid, Typography, Link, Box } from "@mui/material";

import { CartContext } from "@/context/cart";
import { countries, currency } from "@/utils";

export const OrderSummary = () => {
  const { shippingAddress, numberOfItems, total, subTotal, taxRate } =
    useContext(CartContext);

  if (!shippingAddress) {
    return <></>;
  }

  const { firstname, lastname, address, phone, city, country, zip } =
    shippingAddress!;
  const countryMatched = countries.find(
    (_country) => _country.code === country
  )?.name;

  return (
    <>
      {/* ==> Informacion de la direccion del usuario */}
      <Box>
        <Box display="flex" justifyContent={"space-between"}>
          <Typography fontFamily="Oxygen" fontSize={18} fontWeight="bold">
            Direccion de entrega
          </Typography>
          <NextLink passHref href="/checkout/address" legacyBehavior>
            <Link underline="always" color="#000FFF">
              Editar
            </Link>
          </NextLink>
        </Box>
        <Typography fontFamily="Oxygen">
          {firstname} {lastname}
        </Typography>
        <Typography fontFamily="Oxygen">{address}</Typography>
        <Typography fontFamily="Oxygen">
          {city}, {zip}
        </Typography>
        <Typography fontFamily="Oxygen">{countryMatched}</Typography>
        <Typography fontFamily="Oxygen">{phone}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent={"space-between"}
          mb={0.5}
        >
          <Typography fontFamily="Oxygen" fontSize={18} fontWeight="bold">
            Carrito
          </Typography>
          <NextLink passHref href="/cart" legacyBehavior>
            <Link underline="always" color="#000FFF">
              Editar
            </Link>
          </NextLink>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent={"space-between"}>
          <Typography fontFamily="Oxygen">Nro. Productos</Typography>
          <Typography fontFamily="Oxygen">{numberOfItems}</Typography>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent={"space-between"}>
          <Typography fontFamily="Oxygen">Subtotal</Typography>
          <Typography fontFamily="Oxygen">
            {currency.format(subTotal)}
          </Typography>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent={"space-between"}>
          <Typography fontFamily="Oxygen">
            Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
          </Typography>
          <Typography fontFamily="Oxygen">
            {currency.format(taxRate)}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          justifyContent={"space-between"}
          sx={{ mt: 2 }}
          color={"white"}
          bgcolor={"#777"}
          padding={"5px"}
        >
          <Typography variant="h2" fontWeight={550} fontFamily="Roboto">
            Total:
          </Typography>
          <Typography variant="h2" fontWeight={550} fontFamily="Roboto">
            {currency.format(total)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
