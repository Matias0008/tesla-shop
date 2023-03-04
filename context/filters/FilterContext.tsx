import { createContext } from "react";

interface Context {
  filters: {};
  openFilters: boolean;
  filtersForQuery: string;
  updateFilters: (payload: {}) => void;
  toggleViewFilters: () => void;
}

export const FilterContext = createContext({} as Context);
