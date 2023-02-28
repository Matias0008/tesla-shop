import { Box, Typography } from "@mui/material";

import { AdminNavbar } from "../admin";
import { Sidebar } from "../ui";

interface Props {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  icon?: JSX.Element;
}

export const AdminLayout: React.FC<Props> = ({
  children,
  title,
  subTitle,
  icon,
}) => {
  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 999 }}>
        <AdminNavbar />
      </nav>
      <Sidebar />
      <Box
        component={"main"}
        sx={{
          maxWidth: 1400,
          width: { xs: "100%", md: "90%" },
          padding: { xs: "28px", sm: "36px" },
          margin: "0 auto",
        }}
      >
        <Box display="flex" flexDirection="column" gap={0.5}>
          <Typography variant="h1" component="h1">
            {icon} {title}
          </Typography>
          <Typography variant="h2">{subTitle}</Typography>
        </Box>
        {children}
      </Box>
    </>
  );
};
