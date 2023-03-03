import { useState } from "react";
import NextLink from "next/link";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import { Product } from "@/interfaces";

interface Props {
  product: Product;
}

export const RecommendationCard: React.FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
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
            <CardActionArea
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
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
    </Grid>
  );
};
