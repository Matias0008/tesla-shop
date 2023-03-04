import { Box, Button, Typography } from "@mui/material";
import styles from "./SizeSelector.module.css";

import { ISizes } from "@/interfaces";

interface Props {
  selectedSize?: ISizes;
  sizes: ISizes[];
  onSizeChange: (size: ISizes) => void;
}

export const SizeSelector: React.FC<Props> = ({
  onSizeChange,
  selectedSize,
  sizes,
}) => {
  return (
    <Box display="flex" flexDirection="column" flexWrap="wrap" zIndex={1}>
      <Typography fontWeight={700} mb={1.2}>
        Talle: {selectedSize !== "all" ? selectedSize : ""}
      </Typography>
      <Box display="flex" gap={1.5} flexWrap="wrap">
        {sizes.map((size) => (
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
                  minWidth: 35,
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
