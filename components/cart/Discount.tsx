import { Box, Button, TextField } from "@mui/material";

export const Discount = () => {
  return (
    <Box mt={2} display="flex" gap={1}>
      <TextField
        label="Cupón"
        size="small"
        sx={{
          flex: 1,
        }}
      />
      <Button
        sx={{ fontSize: 13 }}
        size="small"
        color="secondary"
        className="circular-btn"
      >
        Aplicar descuento
      </Button>
    </Box>
  );
};
