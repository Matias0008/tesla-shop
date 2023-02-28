import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

export const lightTheme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "Oxygen", "Roboto"].join(","),
  },
  palette: {
    mode: "light",
    primary: {
      main: "#1E1E1E",
      "50": blue.A400,
    },
    secondary: {
      main: "#777",
    },
    info: {
      main: "#fff",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "sticky",
      },
      styleOverrides: {
        root: {
          backgroundColor: "white",
          height: 60,
          maxWidth: 1900,
          margin: "0 auto",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 35,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 16,
          fontWeight: 600,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "small",
        disableElevation: true,
        color: "info",
      },
      styleOverrides: {
        root: {
          fontSize: 16,
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 0,
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.05)",
            transition: "all 0.3s ease-in-out",
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow:
            "rgb(0 0 0 / 10%) 0px 0px 5px 0px, rgb(0 0 0 / 10%) 0px 0px 1px 0px;",
          borderRadius: "10px",
        },
      },
    },
  },
});
