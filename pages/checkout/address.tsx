import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { countries } from "@/utils";
import { ShopLayout } from "@/components/layouts";
import { CartContext } from "@/context/cart";

type FormData = {
  firstname: string;
  lastname: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  let addressCookies = Cookies.get("address");

  if (addressCookies) {
    return JSON.parse(addressCookies);
  }

  return {
    firstname: "",
    lastname: "",
    address: "",
    zip: "",
    city: "",
    country: "CRI",
    phone: "",
  };
};

const AddressPage = () => {
  const router = useRouter();
  const { updateAddress } = useContext(CartContext);
  const [isHydrated, setIsHydrated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  // Fix the hydration error because try to get the data of cookies
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const onSubmit = (data: FormData) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };

  if (!isHydrated) return;

  return (
    <ShopLayout title="Checkout Address | Tesla Shop" pageDescription="Direccion de la entrega">
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Dirección
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register("firstname", {
                required: "El nombre es requerido",
              })}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register("lastname", {
                required: "El apellido es requerido",
              })}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Dirección"
              variant="filled"
              fullWidth
              {...register("address", {
                required: "La dirección es requerida",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Código postal"
              variant="filled"
              fullWidth
              {...register("zip", {
                required: "El codigo postal es requerido",
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Telefono"
              variant="filled"
              fullWidth
              {...register("phone", {
                required: "El telefono es requerido",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Select
                variant="filled"
                defaultValue={getAddressFromCookies().country}
                {...register("country", {
                  required: "El pais es requerido",
                })}
                error={!!errors.country}
              >
                {countries.map((_country) => (
                  <MenuItem key={_country.code} value={_country.code}>
                    {_country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              {...register("city", {
                required: "La ciudad es requerida",
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent={"center"} sx={{ mt: 3 }}>
          <Button type="submit" color="secondary" className="circular-btn" size="large">
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;
