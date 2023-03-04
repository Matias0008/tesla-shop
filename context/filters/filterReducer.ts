import { FilterState } from "./";

type FilterActionType =
  | {
      type: "[Filter] - Update filters";
      payload: { [key: string]: string };
    }
  | {
      type: "[Filter] - Toggle view filters";
    }
  | {
      type: "[Filter] - Open filters";
    };

export const filterReducer = (
  state: FilterState,
  action: FilterActionType
): FilterState => {
  switch (action.type) {
    case "[Filter] - Update filters":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case "[Filter] - Toggle view filters":
      return {
        ...state,
        openFilters: !state.openFilters,
      };
    case "[Filter] - Open filters":
      return {
        ...state,
        openFilters: true,
      };

    default:
      return state;
  }
};
