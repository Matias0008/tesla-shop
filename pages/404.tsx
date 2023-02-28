import NextLink from "next/link";

import { Box, Link, Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";

const Custom404 = () => {
  return (
    <ShopLayout
      title="Page not found | Tesla-Shop"
      pageDescription="No hay nada para mostrar"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        height={"calc(100vh - 190px)"}
        flexWrap={"wrap"}
        flexDirection="column"
        gap={{ xs: 2, sm: 0 }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <Typography
            variant="h1"
            component="h1"
            fontSize={70}
            fontWeight={200}
            sx={{ marginRight: { sm: 3 } }}
          >
            404
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            fontSize={20}
            fontWeight={400}
          >
            No hay ninguna página para mostrar.
          </Typography>
        </Box>
        <NextLink passHref href="/" legacyBehavior>
          <Link underline="hover" color="#0000FF">
            Ir al inicio
          </Link>
        </NextLink>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
