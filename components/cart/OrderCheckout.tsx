import { useContext } from "react";

import { Grid, Typography } from "@mui/material";

import { currency } from "@/utils";
import { CartContext } from "@/context/cart";

export const OrderCheckout = () => {
  const { numberOfItems, total, subTotal, taxRate } = useContext(CartContext);

  return (
    <>
      <Grid container>
        <Grid item xs={12} display="flex" justifyContent={"space-between"}>
          <Typography fontFamily="Oxygen">Nro. Productos</Typography>
          <Typography fontFamily="Oxygen">{numberOfItems}</Typography>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent={"space-between"}>
          <Typography fontFamily="Oxygen">Subtotal</Typography>
          <Typography fontFamily="Oxygen">{currency.format(subTotal)}</Typography>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent={"space-between"}>
          <Typography fontFamily="Oxygen">
            Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
          </Typography>
          <Typography fontFamily="Oxygen">{currency.format(taxRate)}</Typography>
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          justifyContent={"space-between"}
          sx={{ mt: 2 }}
          color={"black"}
          bgcolor={"unset"}
          padding={"0px"}
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
