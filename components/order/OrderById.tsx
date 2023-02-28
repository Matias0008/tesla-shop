import { useMemo } from "react";
import { Divider, Grid, Typography, Box } from "@mui/material";

import { IOrder } from "@/interfaces";
import { countries, currency } from "@/utils";

export const OrderById = ({ order }: { order: IOrder }) => {
  const { shippingAddress } = order;
  const countryMatched = useMemo(() => {
    return countries.find(
      (country) => country.code === order.shippingAddress.country
    )?.name;
  }, [order]);

  return (
    <>
      {/* ==> Informacion de la direccion del usuario */}
      <Box>
        <Box display="flex" justifyContent={"space-between"}>
          <Typography fontFamily="Oxygen" fontSize={18} fontWeight="bold">
            Direccion de entrega
          </Typography>
        </Box>
        <Typography fontFamily="Oxygen">
          {shippingAddress.firstname} {shippingAddress.lastname}
        </Typography>
        <Typography fontFamily="Oxygen">{shippingAddress.address}</Typography>
        <Typography fontFamily="Oxygen">
          {shippingAddress.city}, {shippingAddress.zip}
        </Typography>
        <Typography fontFamily="Oxygen">{countryMatched}</Typography>
        <Typography fontFamily="Oxygen">{shippingAddress.phone}</Typography>
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
        </Grid>
        <Grid item xs={12} display="flex" justifyContent={"space-between"}>
          <Typography fontFamily="Oxygen">Nro. Productos</Typography>
          <Typography fontFamily="Oxygen">{order.numberOfItems}</Typography>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent={"space-between"}>
          <Typography fontFamily="Oxygen">Subtotal</Typography>
          <Typography fontFamily="Oxygen">
            {currency.format(order.subTotal)}
          </Typography>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent={"space-between"}>
          <Typography fontFamily="Oxygen">
            Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
          </Typography>
          <Typography fontFamily="Oxygen">
            {currency.format(order.taxRate)}
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
            {currency.format(order.total)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
