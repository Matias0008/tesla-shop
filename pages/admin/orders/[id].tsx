import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import {
  CreditScoreOutlined,
  RemoveShoppingCartOutlined,
  ShopOutlined,
} from "@mui/icons-material";

import { IOrder } from "@/interfaces";

import { dbOrders } from "@/database";
import { ShopLayout } from "@/components/layouts";
import { CartList } from "@/components/cart";
import { OrderById } from "@/components/order/OrderById";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  return (
    <ShopLayout
      title={`Resumen de la orden - ${order._id?.substring(0, 10)}...`}
      pageDescription="Carrito de compras en la tienda"
    >
      <Grid container columnSpacing={8} rowSpacing={8} className="fadeIn">
        {/* Grid item for the cart list */}
        <Grid item xs={12} lg={7}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={{ xs: "center", sm: "flex-start" }}
            flexWrap="wrap"
            gap={1}
            mb={2}
          >
            <Typography variant="h1" component="h1" fontSize={40}>
              Orden:
            </Typography>
            <Typography
              component="h2"
              fontSize={{ xs: 20, sm: 30 }}
              mt={{ xs: 0, sm: 0.5 }}
            >
              {order._id}
            </Typography>
            <Box
              width="100%"
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              {order.isPaid ? (
                <Chip
                  label="La orden fue pagada"
                  sx={{
                    mb: 2,
                    padding: 2,
                    paddingLeft: "initial",
                    paddingRight: "initial",
                    fontSize: 14,
                  }}
                  icon={<CreditScoreOutlined />}
                  variant="outlined"
                  color="success"
                />
              ) : (
                <Chip
                  label="Pendiente de pago"
                  sx={{ mb: 2 }}
                  icon={<RemoveShoppingCartOutlined />}
                  variant="outlined"
                  color="error"
                />
              )}
            </Box>
          </Box>

          <CartList products={order.orderItems} />
        </Grid>

        {/* Grid item for the order summary */}
        <Grid item xs={12} lg={5}>
          <Card className="summary-card" sx={{ position: "sticky", top: 64 }}>
            <CardContent>
              <Box display="flex" justifyContent={"space-between"}>
                <Typography variant="h2" fontWeight={500}>
                  {order.numberOfItems}{" "}
                  {order.numberOfItems > 1 ? "Productos" : "Producto"}
                </Typography>
                <ShopOutlined />
              </Box>

              <Divider sx={{ my: 2 }} />
              <OrderById order={order} />
              <Divider sx={{ my: 2 }} />

              <Box
                display="flex"
                flexDirection="column"
                gap={2.5}
                justifyContent={{ xs: "center", lg: "flex-start" }}
                alignItems={{ xs: "center", lg: "flex-start" }}
              >
                {order.isPaid ? (
                  <Chip
                    label="La orden fue pagada"
                    sx={{ mt: 1, width: "100%", padding: 2, fontSize: 14 }}
                    icon={<CreditScoreOutlined />}
                    variant="outlined"
                    color="success"
                  />
                ) : (
                  <Chip
                    label="Pendiente de pago"
                    sx={{ mt: 1, width: "100%", padding: 2, fontSize: 14 }}
                    icon={<RemoveShoppingCartOutlined />}
                    variant="outlined"
                    color="error"
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;
  const session: any = await getSession({ req });
  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "admin/orders",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};
