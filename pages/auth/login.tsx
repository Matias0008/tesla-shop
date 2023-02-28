import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getProviders, getSession, signIn } from "next-auth/react";
import NextLink from "next/link";

import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { ErrorOutlined } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";

import { AuthLayout } from "@/components/layouts";
import { validations } from "@/utils";

type FormData = {
  email: string;
  password: string;
};

const ICONS_PROVIDERS: any = {
  github: <GitHubIcon sx={{ fontSize: 35 }} />,
};

const LoginPage = () => {
  const router = useRouter();
  const [providers, setProviders] = useState<any>("");
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    await signIn("credentials", { email, password });
  };

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <AuthLayout title="Ingresar | Tesla-Shop">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ maxWidth: 400, padding: "20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign="center">
                Iniciar sesion
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1} flexDirection="column">
              <Chip
                label="Verifica el usuario y/o contraseña"
                color="error"
                icon={<ErrorOutlined />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "El email es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Contraseña"
                variant="filled"
                type="password"
                fullWidth
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "Debe tener mínimo 6 caracteres",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                type="submit"
                fullWidth
                disabled={showError}
              >
                Ingresar
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end" mt={1}>
            <NextLink
              href={
                router.query.p
                  ? `/auth/register?p=${router.query.p.toString()}`
                  : "/auth/register"
              }
              passHref
              legacyBehavior
            >
              <Link underline="always">¿No tienes cuenta?</Link>
            </NextLink>
          </Grid>

          <Divider sx={{ my: 2 }}>O ingresa con</Divider>
          <Grid item xs={12} display="flex" justifyContent="center" gap={1}>
            {Object.values(providers).map((provider: any) => {
              if (provider.id === "credentials") {
                return <Box display="none" key="credentials"></Box>;
              }

              return (
                <IconButton
                  onClick={() => signIn(provider.id)}
                  key={provider.id}
                >
                  {ICONS_PROVIDERS[provider.id]}
                </IconButton>
              );
            })}
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, query } = ctx;
  const { p = "/" } = query; // Previous path
  const session = await getSession({ req });

  //* Si estamos logeados no mostramos la pagina
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
