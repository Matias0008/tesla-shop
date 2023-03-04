import { useContext } from "react";
import { Box, Button } from "@mui/material";

import { FilterSizeSelector, FilterGenderSelector } from "@/components/filters";
import { FilterContext } from "@/context/filters/";
import { Product } from "@/interfaces";

interface Props {
  showGenderFilter?: boolean;
  products?: Product[];
}

export const Filters: React.FC<Props> = ({
  showGenderFilter = false,
  products,
}) => {
  const { openFilters, toggleViewFilters } = useContext(FilterContext);

  const onToggleVisible = () => {
    toggleViewFilters();
  };

  return (
    <>
      <Box
        minWidth={"max-content"}
        flexDirection="column"
        display="flex"
        gap={2}
        mb={1}
      >
        <Button
          color="secondary"
          onClick={onToggleVisible}
          sx={{
            display: { xs: "block", lg: "none" },
            "&:hover": {
              backgroundColor: "rgb(83, 83, 83)",
            },
          }}
        >
          {openFilters ? "Ocultar filtros" : "Ver filtros"}
        </Button>
        <Box
          display={{ xs: openFilters ? "flex" : "none", lg: "flex" }}
          gap={3}
          flexDirection="column"
        >
          <FilterSizeSelector products={products} />
          {showGenderFilter && <FilterGenderSelector />}
        </Box>
      </Box>
    </>
  );
};
