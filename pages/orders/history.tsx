import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import NextLink from "next/link";

import { Grid, Typography, Chip, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { ShopLayout } from "@/components/layouts";
import { dbOrders } from "@/database";
import { IOrder } from "@/interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra informacion si esta pagada la orden o no",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.isPaid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "Orden",
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      const orderId = params.row.orderId;
      return (
        <NextLink href={`/orders/${orderId}`} legacyBehavior passHref>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    orderId: order._id,
    isPaid: order.isPaid,
    fullname: `${order.shippingAddress.firstname} ${order.shippingAddress.lastname}`,
  }));

  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del cliente"
    >
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Historial de ordenes
      </Typography>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ minHeight: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrderByUserId(session.user?._id);
  return {
    props: {
      orders,
    },
  };
};
