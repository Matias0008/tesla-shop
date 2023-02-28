import { Box, Pagination as MuiPagination } from "@mui/material";

interface Props {
  page: number;
  pages: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const Pagination: React.FC<Props> = ({ page, pages, handleChange }) => {
  return (
    <Box width="100%" display="flex" justifyContent="center" mt={5}>
      <MuiPagination
        count={pages}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};
