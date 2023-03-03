import { ChangeEvent, useEffect, useRef, useState } from "react";
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

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const mouseMoveRef = useRef<any>();

  useEffect(() => {
    const checkHover = (e: any) => {
      if (mouseMoveRef.current) {
        const mouseOver = mouseMoveRef.current.contains(e.target);
        if (!isHovered && mouseOver) {
          setIsHovered(true);
        }

        if (isHovered && !mouseOver) {
          setIsHovered(false);
        }
      }
    };
    window.addEventListener("mousemove", checkHover, true);
    return () => {
      window.removeEventListener("mousemove", checkHover, true);
    };
  }, [isHovered]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      key={product._id}
      ref={mouseMoveRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
              <CardMedia
                component="img"
                image={isHovered ? product.images[1] : product.images[0]}
                onLoad={() => setImageLoaded(true)}
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
