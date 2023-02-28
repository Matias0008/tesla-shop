import useSWR from "swr";

import { Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { PeopleAltOutlined } from "@mui/icons-material";

import { IUser, IOrder } from "@/interfaces";
import { AdminLayout } from "@/components/layouts";
import { currency } from "@/utils";

const columns: GridColDef[] = [
  { field: "id", headerName: "Orden ID", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "name", headerName: "Nombre completo", width: 250 },
  {
    field: "total",
    headerName: "Monto total",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "isPaid",
    headerName: "Estado",
    headerAlign: "center",
    align: "center",
    width: 120,
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip label="Pagada" color="success" variant="outlined" />
      ) : (
        <Chip label="Pendiente" color="error" variant="outlined" />
      );
    },
  },
  {
    field: "numberOfItems",
    headerName: "Nro productos",
    width: 150,
    headerAlign: "center",
    align: "center",
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: "createdAt",
    headerName: "Creada el",
    width: 300,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "check",
    headerName: "Ver orden",
    headerAlign: "center",
    align: "center",
    width: 100,
    filterable: false,
    disableColumnMenu: true,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          Ver orden
        </a>
      );
    },
  },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");

  if (!data && !error) {
    return <></>;
  }

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: currency.format(order.total),
    isPaid: order.isPaid,
    numberOfItems: order.numberOfItems,
    createdAt: new Date(order.createdAt!).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <AdminLayout
      title="Ordenes"
      subTitle="Vista de todas las ordenes"
      icon={<PeopleAltOutlined />}
    >
      <Grid container className="fadeIn" mt={4}>
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
    </AdminLayout>
  );
};

export default OrdersPage;
