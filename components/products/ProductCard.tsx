import { useState } from "react";
import NextLink from "next/link";

import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import { Product } from "@/interfaces";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={product._id}
    >
      <Card>
        <NextLink
          href={`/product/${product.slug}`}
          passHref
          legacyBehavior
          prefetch={false}
        >
          <Link>
            <CardActionArea>
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
              {isHovered ? (
                <CardMedia
                  sx={{ opacity: 0 }}
                  className="fadeIn"
                  component="img"
                  image={product.images[1]}
                  onLoad={() => setImageLoaded(true)}
                />
              ) : (
                <CardMedia
                  component="img"
                  image={product.images[0]}
                  onLoad={() => setImageLoaded(true)}
                />
              )}
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
