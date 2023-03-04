import { useMemo, useReducer } from "react";

import { FilterContext, filterReducer } from "./";

export interface FilterState {
  filters: {};
  openFilters: boolean;
}

const Filter_INITIAL_STATE: FilterState = {
  filters: {
    size: "all",
    gender: "all",
  },
  openFilters: false,
};

interface ProviderProps {
  children: React.ReactNode;
}

export const FilterProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, Filter_INITIAL_STATE);
  const filtersForQuery = useMemo(() => {
    return Object.entries(state.filters)
      .map((entry) => {
        const [filter, value] = entry;
        return `&${filter}=${value}`;
      })
      .join("");
  }, [state.filters]);

  const updateFilters = (payload: {}) => {
    dispatch({
      type: "[Filter] - Update filters",
      payload,
    });
    dispatch({
      type: "[Filter] - Open filters",
    });
  };

  const toggleViewFilters = () => {
    dispatch({
      type: "[Filter] - Toggle view filters",
    });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        filtersForQuery,
        updateFilters,
        toggleViewFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
