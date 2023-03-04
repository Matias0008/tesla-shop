import NextLink from "next/link";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import { Product } from "@/interfaces";

import styles from "./ProductCard.module.css";

interface Props {
  product: Product;
}

export const RecommendationCard: React.FC<Props> = ({ product }) => {
  return (
    <Grid item xs={6} sm={4} md={3} key={product._id}>
      <Card>
        <NextLink
          href={`/product/${product.slug}`}
          passHref
          legacyBehavior
          prefetch={false}
        >
          <Link className={styles.hoverableItem}>
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
            <CardMedia component="img" image={product.images[0]} />
            <CardMedia
              component="img"
              image={product.images[1]}
              sx={{ display: "none" }}
            />
          </Link>
        </NextLink>
      </Card>
    </Grid>
  );
};
