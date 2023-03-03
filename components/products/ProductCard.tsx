import { useState } from "react";
import NextLink from "next/link";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { Product } from "@/interfaces";

import styles from "./ProductCard.module.css";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Grid item xs={6} sm={4} md={3} key={product._id}>
      <Card>
        <NextLink
          href={`/product/${product.slug}`}
          passHref
          legacyBehavior
          prefetch={false}
        >
          <Link>
            <CardActionArea className={styles.hoverableItem}>
              {product.inStock === 0 && (
                <Chip
                  color="primary"
                  label="No hay disponibles"
                  sx={{
                    position: "absolute",
                    zIndex: 3,
                    borderRadius: 0,
                  }}
                />
              )}
              <CardMedia
                component="img"
                image={product.images[0]}
                onLoad={() => setImageLoaded(true)}
              />
              <CardMedia
                component="img"
                image={product.images[1]}
                onLoad={() => setImageLoaded(true)}
                sx={{ display: "none" }}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box
        sx={{ mt: 2, display: imageLoaded ? "block" : "none" }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={550}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
