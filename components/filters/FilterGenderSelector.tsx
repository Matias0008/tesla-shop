import { useState, useContext } from "react";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { FilterContext } from "@/context/filters";
import { VALID_GENDERS } from "@/constants";

const mapGender: any = {
  all: "Todos",
  kid: "Niños",
  men: "Hombre",
  women: "Mujer",
  unisex: "Unisex",
};
35;
export const FilterGenderSelector = () => {
  const { filters, updateFilters } = useContext(FilterContext);
  const [selectedGender, setSelectedGender] = useState(
    (filters as any).gender || "all"
  );
  const onGenderChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value);
    updateFilters({
      gender: event.target.value,
    });
  };

  return (
    <Box display="flex" flexDirection="column" flexWrap="wrap" zIndex={1}>
      <Typography fontWeight={700} mb={1.2} fontSize={18}>
        Genero
      </Typography>
      {/* <Box display="flex" gap={1.5} flexWrap="wrap"> */}
      <Select
        defaultValue={selectedGender}
        value={selectedGender}
        onChange={onGenderChange}
        size="small"
      >
        <MenuItem value="all">Todos</MenuItem>
        {VALID_GENDERS.map((gender) => {
          return (
            <MenuItem value={gender} key={gender}>
              {mapGender[gender]}
            </MenuItem>
          );
        })}
      </Select>
      {/* </Box> */}
    </Box>
  );
};
