import { ISizes } from "@/interfaces";
import { Box, Button } from "@mui/material";
import { useState } from "react";

import { SizeSelector } from "./SizeSelector";

interface Props {
  onSizeChange: (size: ISizes) => void;
  selectedSize: ISizes;
}

export const Filters: React.FC<Props> = ({ onSizeChange, selectedSize }) => {
  const [filterVisible, setFilterVisible] = useState(false);

  const onToggleVisible = () => {
    setFilterVisible(!filterVisible);
  };

  const onChange = (size: ISizes) => {
    onSizeChange(size);
    setFilterVisible(true);
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
            display: { xs: "block", md: "none" },
          }}
        >
          {filterVisible ? "Ocultar filtros" : "Ver filtros"}
        </Button>
        <Box display={{ xs: filterVisible ? "flex" : "none", lg: "flex" }}>
          <SizeSelector
            sizes={["XS", "S", "M", "L", "XL"]}
            onSizeChange={(size) => onChange(size)}
            selectedSize={selectedSize}
          />
        </Box>
      </Box>
    </>
  );
};
