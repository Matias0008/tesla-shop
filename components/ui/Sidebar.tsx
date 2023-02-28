import { useRouter } from "next/router";
import { useContext, useState } from "react";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined";
import EscalatorWarningOutlined from "@mui/icons-material/EscalatorWarningOutlined";
import FemaleOutlined from "@mui/icons-material/FemaleOutlined";
import MaleOutlined from "@mui/icons-material/MaleOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import VpnKeyOutlined from "@mui/icons-material/VpnKeyOutlined";
import LoginOutlined from "@mui/icons-material/LoginOutlined";

import { UIContext } from "@/context/ui";
import { AuthContext } from "@/context/auth";
import { DashboardOutlined } from "@mui/icons-material";

export const Sidebar = () => {
  const router = useRouter();
  const { isMenuOpen, toggleMenu, searchAutoFocus } = useContext(UIContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Leyendo datos del login
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    toggleMenu(false);
    router.push(url);
  };

  return (
    <Drawer
      anchor="right"
      sx={{ backdropFilter: "blur(8px)", transition: "all 0.5s ease-out" }}
      open={isMenuOpen}
      onClose={toggleMenu}
    >
      <Box sx={{ padding: 1 }}>
        <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <ListItem>
            <Input
              sx={{
                display: { lg: "none" },
              }}
              autoFocus={searchAutoFocus ? true : false}
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              viewBox="-41.8008 -9.08425 362.2736 54.5055"
            >
              <path d="M238.077 14.382v21.912h7.027V21.705h25.575v14.589h7.022V14.42l-39.624-.038m6.244-7.088h27.02c3.753-.746 6.544-4.058 7.331-7.262h-41.681c.779 3.205 3.611 6.516 7.33 7.262m-27.526 29.014c3.543-1.502 5.449-4.1 6.179-7.14h-31.517l.02-29.118-7.065.02v36.238h32.383M131.874 7.196h24.954c3.762-1.093 6.921-3.959 7.691-7.136h-39.64v21.415h32.444v7.515l-25.449.02c-3.988 1.112-7.37 3.79-9.057 7.327l2.062-.038h39.415V14.355h-32.42V7.196m-61.603.069h27.011c3.758-.749 6.551-4.058 7.334-7.265H62.937c.778 3.207 3.612 6.516 7.334 7.265m0 14.322h27.011c3.758-.741 6.551-4.053 7.334-7.262H62.937c.778 3.21 3.612 6.521 7.334 7.262m0 14.717h27.011c3.758-.747 6.551-4.058 7.334-7.263H62.937c.778 3.206 3.612 6.516 7.334 7.263M0 .088c.812 3.167 3.554 6.404 7.316 7.215h11.37l.58.229v28.691h7.1V7.532l.645-.229h11.38c3.804-.98 6.487-4.048 7.285-7.215v-.07H0v.07" />
            </svg>
          </Box>

          <Box>
            <ListSubheader>Inicio</ListSubheader>

            <ListItemButton
              sx={{ display: isLoggedIn ? "none" : "flex" }}
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItemButton>

            <ListItemButton sx={{ display: isLoggedIn ? "flex" : "none" }}>
              <ListItemIcon>
                <AccountCircleOutlined />
              </ListItemIcon>
              <ListItemText primary={"Perfil"} />
            </ListItemButton>

            <ListItemButton
              sx={{ display: isLoggedIn ? "flex" : "none" }}
              onClick={() => navigateTo("/orders/history")}
            >
              <ListItemIcon>
                <ConfirmationNumberOutlined />
              </ListItemIcon>
              <ListItemText primary={"Mis Ordenes"} />
            </ListItemButton>

            <ListItemButton
              sx={{ display: isLoggedIn ? "flex" : "none", mb: 1 }}
              onClick={logout}
            >
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItemButton>
          </Box>

          <Box display={{ xs: "", lg: "none" }}>
            <ListSubheader sx={{ display: { lg: "none" } }}>
              Categorias
            </ListSubheader>
            <ListItemButton
              sx={{
                background:
                  router.asPath === "/category/men" ? "black" : "white",
                color: router.asPath === "/category/men" ? "white" : "black",
              }}
              onClick={() => navigateTo("/category/men")}
            >
              <ListItemIcon>
                <MaleOutlined
                  sx={{
                    color:
                      router.asPath === "/category/men" ? "white" : "black",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={"Hombres"} />
            </ListItemButton>

            <ListItemButton
              sx={{
                background:
                  router.asPath === "/category/women" ? "black" : "white",
                color: router.asPath === "/category/women" ? "white" : "black",
              }}
              onClick={() => navigateTo("/category/women")}
            >
              <ListItemIcon>
                <FemaleOutlined
                  sx={{
                    color:
                      router.asPath === "/category/women" ? "white" : "black",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={"Mujeres"} />
            </ListItemButton>

            <ListItemButton
              sx={{
                background:
                  router.asPath === "/category/kid" ? "black" : "white",
                color: router.asPath === "/category/kid" ? "white" : "black",
              }}
              onClick={() => navigateTo("/category/kid")}
            >
              <ListItemIcon>
                <EscalatorWarningOutlined
                  sx={{
                    color:
                      router.asPath === "/category/kid" ? "white" : "black",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={"Niños"} />
            </ListItemButton>
          </Box>

          {/*//! Admin */}
          <Box sx={{ display: user?.role === "admin" ? "block" : "none" }}>
            <ListSubheader sx={{ mt: 1 }}>Admin Panel</ListSubheader>

            <ListItemButton onClick={() => navigateTo("/admin/")}>
              <ListItemIcon>
                <DashboardOutlined />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>

            <ListItemButton onClick={() => navigateTo("/admin/products")}>
              <ListItemIcon>
                <CategoryOutlined />
              </ListItemIcon>
              <ListItemText primary={"Productos"} />
            </ListItemButton>

            <ListItemButton onClick={() => navigateTo("/admin/orders")}>
              <ListItemIcon>
                <ConfirmationNumberOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ordenes"} />
            </ListItemButton>

            <ListItemButton onClick={() => navigateTo("/admin/users")}>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText primary={"Usuarios"} />
            </ListItemButton>
          </Box>
        </List>
      </Box>
    </Drawer>
  );
};
