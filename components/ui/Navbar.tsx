import { useContext, useState } from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
} from "@mui/material";

import ClearOutlined from "@mui/icons-material/ClearOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";

import { UIContext } from "@/context/ui";
import { CartContext } from "@/context/cart";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { MenuOutlined, ViewSidebarOutlined } from "@mui/icons-material";

export const Navbar = () => {
  const { pathname, push } = useRouter();
  const { toggleMenu } = useContext(UIContext);
  const { numberOfItems } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "primary",
        height: "80px",
        justifyContent: "center",
        boxShadow: "0 1px 1px 0 rgba(0,0,0,.1)",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1400,
          width: { xs: "100%", md: "90%" },
          margin: "0 auto",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          {" "}
          <NextLink href={"/"} passHref legacyBehavior>
            <Link display="flex" alignItems="center" ml={"-15px"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                viewBox="-41.8008 -9.08425 362.2736 54.5055"
              >
                <path d="M238.077 14.382v21.912h7.027V21.705h25.575v14.589h7.022V14.42l-39.624-.038m6.244-7.088h27.02c3.753-.746 6.544-4.058 7.331-7.262h-41.681c.779 3.205 3.611 6.516 7.33 7.262m-27.526 29.014c3.543-1.502 5.449-4.1 6.179-7.14h-31.517l.02-29.118-7.065.02v36.238h32.383M131.874 7.196h24.954c3.762-1.093 6.921-3.959 7.691-7.136h-39.64v21.415h32.444v7.515l-25.449.02c-3.988 1.112-7.37 3.79-9.057 7.327l2.062-.038h39.415V14.355h-32.42V7.196m-61.603.069h27.011c3.758-.749 6.551-4.058 7.334-7.265H62.937c.778 3.207 3.612 6.516 7.334 7.265m0 14.322h27.011c3.758-.741 6.551-4.053 7.334-7.262H62.937c.778 3.21 3.612 6.521 7.334 7.262m0 14.717h27.011c3.758-.747 6.551-4.058 7.334-7.263H62.937c.778 3.206 3.612 6.516 7.334 7.263M0 .088c.812 3.167 3.554 6.404 7.316 7.215h11.37l.58.229v28.691h7.1V7.532l.645-.229h11.38c3.804-.98 6.487-4.048 7.285-7.215v-.07H0v.07" />
              </svg>
            </Link>
          </NextLink>
          <Box
            sx={{
              display: isSearchVisible ? "none" : { xs: "none", lg: "flex" },
            }}
            gap={1}
            className="fadeIn"
          >
            <NextLink href="/products" passHref legacyBehavior>
              <Link>
                <Button color={pathname === "/products" ? "primary" : "info"}>
                  Productos
                </Button>
              </Link>
            </NextLink>

            <NextLink href="/category/men" passHref legacyBehavior>
              <Link>
                <Button
                  color={pathname === "/category/men" ? "primary" : "info"}
                >
                  Hombres
                </Button>
              </Link>
            </NextLink>

            <NextLink href="/category/women" passHref legacyBehavior>
              <Link>
                <Button
                  color={pathname === "/category/women" ? "primary" : "info"}
                >
                  Mujeres
                </Button>
              </Link>
            </NextLink>

            <NextLink href="/category/kid" passHref legacyBehavior>
              <Link>
                <Button
                  color={pathname === "/category/kid" ? "primary" : "info"}
                >
                  Niños
                </Button>
              </Link>
            </NextLink>
          </Box>
        </Box>

        <Box display="flex" gap={1}>
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => toggleMenu(true)}
          >
            <SearchIcon />
          </IconButton>
          <Input
            sx={{ display: { xs: "none", md: "flex" } }}
            className="fadeIn"
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
          <NextLink legacyBehavior href="/cart" passHref>
            <Link>
              <IconButton>
                <Badge
                  badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                  color="primary"
                >
                  <CartIcon />
                </Badge>
              </IconButton>
            </Link>
          </NextLink>
          <IconButton
            color="primary"
            sx={{ minWidth: "5px" }}
            onClick={() => toggleMenu(false)}
          >
            <MenuOutlined />
          </IconButton>
        </Box>

        {/* Links */}

        {/* Pantallas grandes */}

        {/* Pantallas pequeñas */}
      </Toolbar>
    </AppBar>
  );
};
