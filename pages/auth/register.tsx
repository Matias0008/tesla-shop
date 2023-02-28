import { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import NextLink from "next/link";

import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { ErrorOutlined } from "@mui/icons-material";

import { validations } from "@/utils";
import { AuthContext } from "@/context/auth";
import { AuthLayout } from "@/components/layouts";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterUser = async ({ name, email, password }: FormData) => {
    //* Validaciones de error con el backend
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setErrorMessage(message!);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
      return;
    }

    await signIn("credentials", { email, password });
  };

  return (
    <AuthLayout title="Registrarse | Tesla-Shop">
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <Box sx={{ maxWidth: 400, padding: "20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign="center">
                Registrarse
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1} flexDirection="column">
              <Chip
                label={errorMessage}
                color="error"
                icon={<ErrorOutlined />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
              <TextField
                label="Nombre"
                variant="filled"
                {...register("name", {
                  required: "El nombre es requerido",
                  minLength: { value: 3, message: "El nombre debe tener minimo 3 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                fullWidth
              />
              <TextField
                label="Correo"
                variant="filled"
                {...register("email", {
                  required: "El email es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                fullWidth
              />
              <TextField
                label="Contraseña"
                variant="filled"
                type="password"
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: { value: 6, message: "La contraseña debe tener minimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                type="submit"
                fullWidth
              >
                Registrarme
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end" mt={1}>
            <NextLink
              href={router.query.p ? `/auth/login?p=${router.query.p.toString()}` : "/auth/login"}
              passHref
              legacyBehavior
            >
              <Link underline="always">Ya tengo una cuenta</Link>
            </NextLink>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, query } = ctx;
  const { p = "/" } = query;
  const session = await getSession({ req });

  //* Si estamos logeados no mostramos la pagina directamente
  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  //* Si no estamos logeados hacemos como si no pasara nada
  return {
    props: {},
  };
};
