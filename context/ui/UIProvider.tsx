import { useReducer } from "react";

import { UIContext, uiReducer } from "./";

export interface UIState {
  isMenuOpen: boolean;
  searchAutoFocus: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false,
  searchAutoFocus: false,
};

interface ProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleMenu = (searchFocus: boolean = true) => {
    dispatch({
      type: "[UI] - ToggleMenu",
      payload: searchFocus,
    });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
