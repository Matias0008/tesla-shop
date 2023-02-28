import NextLink from "next/link";
import useSWR from "swr";

import { Box, Button, CardMedia, Chip, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ProductionQuantityLimitsOutlined } from "@mui/icons-material";

import { IUser, IOrder, Product } from "@/interfaces";
import { AdminLayout } from "@/components/layouts";
import { currency } from "@/utils";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia component="img" src={row.img} />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Nombre",
    width: 300,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref legacyBehavior>
          <Link>{row.title}</Link>
        </NextLink>
      );
      return;
    },
  },
  { field: "gender", headerName: "Genero" },
  { field: "type", headerName: "Tipo" },
  { field: "sizes", headerName: "Talles", width: 200 },
  { field: "inStock", headerName: "Stock" },
  { field: "price", headerName: "Precio" },
  { field: "slug", headerName: "Slug", width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<Product[]>("/api/admin/products");

  if (!data && !error) {
    return <></>;
  }

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    sizes: product.sizes.join(", "),
    inStock: product.inStock,
    price: currency.format(product.price),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title="Productos"
      subTitle="Vista de todos los productos"
      icon={<ProductionQuantityLimitsOutlined />}
    >
      <Box display="flex" justifyContent="end">
        <Button color="primary" href="/admin/products/new">
          Crear producto
        </Button>
      </Box>
      <Grid container className="fadeIn" mt={4}>
        <Grid item xs={12} sx={{ minHeight: 650, width: "100%" }}>
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

export default ProductsPage;
