import { useCallback, useContext, useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { FilterContext } from "@/context/filters";
import { VALID_SIZES } from "@/constants";
import { Product } from "@/interfaces";

import styles from "../products/SizeSelector.module.css";

interface Props {
  products?: Product[];
}

export const FilterSizeSelector: React.FC<Props> = ({ products }) => {
  const { filters, updateFilters } = useContext(FilterContext);
  const [selectedSize, setSelectedSize] = useState(
    (filters as any).size || "all"
  );
  const onSizeChange = (size: string) => {
    setSelectedSize(size);
    updateFilters({
      size,
    });
  };

  const allSizes = useMemo(() => {
    let setSizes = new Set();
    products?.map((product) => {
      product.sizes.map((size) => {
        setSizes.add(size);
      });
    });
    return Array.from(setSizes);
  }, [products]) as string[];

  const sizesToShow = allSizes.length > 0 ? allSizes : VALID_SIZES;

  return (
    <Box display="flex" flexDirection="column" flexWrap="wrap" zIndex={1}>
      <Typography fontWeight={700} mb={1.2} fontSize={18}>
        Talle
      </Typography>
      <Box
        display="flex"
        gap={1.5}
        flexWrap="wrap"
        justifyContent={{ xs: "space-between", sm: "flex-start" }}
      >
        {sizesToShow.map((size) => (
          <Box
            position="relative"
            className={styles.relative}
            sx={{ cursor: "pointer" }}
            key={size}
          >
            <Box
              className={`${
                selectedSize === size ? styles.selected : styles.selectedHover
              }`}
            >
              <Button
                key={size}
                size="small"
                sx={{
                  minWidth: 40,
                  height: 35,
                  width: "max-content",
                  fontSize: { xs: 12, lg: 13 },
                  padding: 0.2,
                  borderRadius: 0,
                  border: "1px solid rgba(0,0,0,0.4)",
                  fontWeight: 550,
                  zIndex: 999,
                }}
                onClick={() => onSizeChange(size)}
              >
                {size}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
