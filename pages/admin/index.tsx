import { useState, useEffect } from "react";
import useSWR from "swr";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";

import CategoryOutlined from "@mui/icons-material/CategoryOutlined";

import { SummaryTile } from "@/components/admin";
import { AdminLayout } from "@/components/layouts";
import { DashboardSummary } from "@/interfaces";

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummary>("/api/admin/dashboard", {
    refreshInterval: 30 * 1000,
  });
  const [refreshIn, setRefreshIn] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 60));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!data && !error) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <h1>Error al cargar la informacion</h1>;
  }

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsOutOfStock,
    lowStock,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container mt={2} spacing={2}>
        <SummaryTile
          title="Ordenes totales"
          value={numberOfOrders}
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 30 }} />}
        />

        <SummaryTile
          title="Ordenes pagadas"
          value={paidOrders}
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 30 }} />}
        />

        <SummaryTile
          title="Ordenes pendientes"
          value={notPaidOrders}
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 30 }} />}
        />

        <SummaryTile
          title="Clientes"
          value={numberOfClients}
          icon={<GroupOutlined color="primary" sx={{ fontSize: 30 }} />}
        />

        <SummaryTile
          title="Productos"
          value={numberOfProducts}
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 30 }} />}
        />

        <SummaryTile
          title="Sin stock"
          value={productsOutOfStock}
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 30 }} />
          }
        />

        <Grid item xs={12} sm={6} lg={6}>
          <Card>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Box display="flex" justifyContent="space-between">
                <Typography color="gray">Bajo inventario</Typography>
                <ProductionQuantityLimitsOutlined
                  color="warning"
                  sx={{ fontSize: 30 }}
                />
              </Box>
              <Typography textAlign="center" variant="h3">
                {lowStock}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <Card>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Box display="flex" justifyContent="space-between">
                <Typography color="gray">Actualizacion en</Typography>
                <AccessTimeOutlined color="secondary" sx={{ fontSize: 30 }} />
              </Box>
              <Typography textAlign="center" variant="h3">
                {refreshIn}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
