import { UIState } from "./";

type UIActionType = { type: "[UI] - ToggleMenu"; payload: boolean };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "[UI] - ToggleMenu":
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
        searchAutoFocus: action.payload,
      };

    default:
      return state;
  }
};
