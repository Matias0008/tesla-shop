import { Box, CircularProgress } from "@mui/material";

export const FullscreenLoading = () => {
  return (
    <Box
      height={"500px"}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <CircularProgress thickness={2} sx={{ fontSize: 20 }} />
    </Box>
  );
};
