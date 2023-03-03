import Grid from "@mui/material/Grid";

import { Product } from "@/interfaces";

import { RecommendationCard } from "./RecommendationCard";

interface Props {
  products: Product[];
}

export const RecommendationList: React.FC<Props> = ({ products }) => {
  return (
    <>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <RecommendationCard product={product} key={product.title} />
        ))}
      </Grid>
    </>
  );
};
