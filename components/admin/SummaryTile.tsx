import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  title: string | number;
  value: string | number;
  icon: JSX.Element;
}

export const SummaryTile: React.FC<Props> = ({ title, value, icon }) => {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box display="flex" justifyContent="space-between">
            <Typography color="gray">{title}</Typography>
            {icon}
          </Box>
          <Typography textAlign="center" variant="h3">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
