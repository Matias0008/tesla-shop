import { createContext } from "react";

interface Context {
  isMenuOpen: boolean;
  searchAutoFocus: boolean;
  toggleMenu: (searchFocus: boolean) => void;
}

export const UIContext = createContext({} as Context);
