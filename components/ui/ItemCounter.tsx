import { Box, IconButton, Typography } from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

interface Props {
  currentValue: number;
  maxValue: number;
  onQuantityChange: (quantity: number) => void;
  slugMode?: boolean;
}

export const ItemCounter: React.FC<Props> = ({
  currentValue,
  maxValue,
  onQuantityChange,
  slugMode = false,
}) => {
  const onChange = (quantity: number) => {
    if (quantity <= maxValue && quantity > 0) {
      onQuantityChange(quantity);
    }
  };

  return (
    <Box
      display={{
        xs: "flex",
        sm: slugMode ? "block" : "flex",
        lg: "flex",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        border="1px solid rgba(0,0,0,0.2)"
        justifyContent="space-evenly"
        height={35}
        width={slugMode ? { xs: "100%", lg: 110 } : 110}
      >
        <IconButton
          sx={{ padding: 0 }}
          size="small"
          onClick={() => onChange(currentValue - 1)}
        >
          <RemoveOutlinedIcon fontSize="small" />
        </IconButton>
        <Typography
          sx={{ marginLeft: 2.5, marginRight: 2.5 }}
          fontSize="medium"
        >
          {currentValue}
        </Typography>
        <IconButton
          sx={{ padding: 0 }}
          size="small"
          onClick={() => onChange(currentValue + 1)}
        >
          <AddOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
