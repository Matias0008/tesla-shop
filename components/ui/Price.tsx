import { Typography } from "@mui/material";

interface Props {
  sx?: {};
  children: React.ReactNode;
}

export const Price: React.FC<Props> = ({ sx = {}, children }) => {
  return (
    <Typography
      fontFamily="Roboto"
      fontWeight="bold"
      sx={sx}
      variant="subtitle1"
    >
      {children}
    </Typography>
  );
};
