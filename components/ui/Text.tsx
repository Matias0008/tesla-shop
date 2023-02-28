import { Typography } from "@mui/material";

interface Props {
  fontWeight?: number;
  color?: string;
  variant?: string;
  children: React.ReactNode;
}

export const Text: React.FC<Props> = ({ children }) => {
  return <Typography fontFamily="Oxygen">{children}</Typography>;
};
