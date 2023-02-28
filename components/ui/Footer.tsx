import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component={"footer"}
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
      minHeight={200}
      bgcolor="black"
    >
      <Box height={"100%"} color="white">
        <Typography>Footer</Typography>
      </Box>
    </Box>
  );
};
