import { useContext } from "react";
import NextLink from "next/link";

import {
  Box,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { CartContext } from "@/context/cart";

import { ItemCounter, Price } from "@/components/ui";
import { ICartProduct, IOrderItem } from "@/interfaces";

interface Props {
  editable?: boolean;
  titleBold?: boolean;
  cartListGap?: boolean;
  products?: IOrderItem[];
}

export const CartList: React.FC<Props> = ({
  editable = false,
  titleBold = false,
  cartListGap = false,
  products,
}) => {
  const { cart, updateCartQuantity, deleteItemFromCart } =
    useContext(CartContext);

  const onQuantityChange = (product: ICartProduct, newQuantity: number) => {
    updateCartQuantity(product, newQuantity);
  };

  const onDeleteItem = (product: ICartProduct) => {
    deleteItemFromCart(product);
  };

  //* ==> Aca podemos recibir los productos para mostrar que esten fuera del contexto
  const productsToShow = products || cart;

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3}>
        {productsToShow.map((product) => (
          <Grid container spacing={2} key={product.slug + product.size}>
            <Grid item xs={4} sm={2}>
              <NextLink
                href={`/product/${product.slug}`}
                passHref
                legacyBehavior
              >
                <Link>
                  <CardActionArea sx={{ height: "100%" }}>
                    <CardMedia
                      image={`${product.image}`}
                      component="img"
                      height="100%"
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={8} sm={8}>
              <Box display="flex" flexDirection="column" gap={1.5}>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={cartListGap ? 1 : 0}
                >
                  <Typography variant="body1" fontWeight={550}>
                    {product.title}
                  </Typography>
                  {editable ? (
                    <>
                      <ItemCounter
                        currentValue={product.quantity}
                        onQuantityChange={(value) =>
                          onQuantityChange(product as ICartProduct, value)
                        }
                        maxValue={10}
                      />
                      <Typography
                        variant="subtitle1"
                        display={{ xs: "none", sm: "block" }}
                      >
                        {product.size}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography>Cantidad: {product.quantity}</Typography>
                      <Typography
                        variant="subtitle1"
                        display={{ xs: "none", sm: "block" }}
                      >
                        {product.size}
                      </Typography>
                    </>
                  )}
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      variant="subtitle1"
                      display={{ xs: "block", sm: "none" }}
                    >
                      ${product.price} / {product.size}
                    </Typography>
                    {editable && (
                      <Link
                        display={{ xs: "block", sm: "none" }}
                        fontWeight={700}
                        underline="hover"
                        sx={{
                          maxWidth: "100px",
                        }}
                      >
                        <DeleteOutlinedIcon color="error" />
                      </Link>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={2}
              sm={2}
              alignItems="end"
              flexDirection="column"
              display={{ xs: "none", sm: "flex" }}
            >
              <Price>$ {product.price}</Price>

              {editable && (
                <Link
                  color="error"
                  fontWeight={700}
                  underline="hover"
                  sx={{
                    maxWidth: "100px",
                    cursor: "pointer",
                  }}
                >
                  <IconButton
                    sx={{ padding: 0 }}
                    onClick={() => onDeleteItem(product as ICartProduct)}
                  >
                    <DeleteOutlinedIcon color="error" />
                  </IconButton>
                </Link>
              )}
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
};
