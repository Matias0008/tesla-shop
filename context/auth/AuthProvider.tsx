import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

import Cookies from "js-cookie";
import axios from "axios";

import { AuthContext, AuthReducer } from "./";
import { tesloApi } from "@/api";
import { IUser } from "@/interfaces";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, Auth_INITIAL_STATE);
  const { data: session, status } = useSession();

  /**
   *! ESTE useEffect es IMPORTANTE
   ** Basicamente este ese el manejador de mi session, sin ello esto no funcionaria el contexto de mi auth. Es el encargado de mantener el contexto actualizado, ya que esta escuchando siempre la session de nuestro nextAuth
   */
  useEffect(() => {
    if (status === "authenticated") {
      dispatch({
        type: "[Auth] - Login",
        payload: session.user as IUser,
      });
    }
  }, [status, session]);

  const logout = () => {
    Cookies.remove("cart");
    Cookies.remove("address");
    signOut();
  };

  const validateToken = async () => {
    if (!Cookies.get("token")) return;

    try {
      const { data } = await tesloApi.get("/user/validate-token");
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({
        type: "[Auth] - Login",
        payload: user,
      });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({
        type: "[Auth] - Login",
        payload: user,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({
        type: "[Auth] - Login",
        payload: user,
      });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "Ha ocurrido un error",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
