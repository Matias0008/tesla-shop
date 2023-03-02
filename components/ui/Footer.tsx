import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component={"footer"}
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
      minHeight={100}
      bgcolor="black"
    >
      <Box height={"100%"} color="white">
        <Typography fontWeight="bold">Tesla © 2023</Typography>
      </Box>
    </Box>
  );
};
