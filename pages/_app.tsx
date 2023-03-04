import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { ThemeProvider, CssBaseline } from "@mui/material";

import { lightTheme } from "@/themes";

import { UIProvider } from "@/context/ui";
import { CartProvider } from "@/context/cart";
import { AuthProvider } from "@/context/auth";

import "@/styles/globals.css";
import { FilterProvider } from "@/context/filters";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        }}
      >
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AuthProvider>
            <FilterProvider>
              <CartProvider>
                <UIProvider>
                  <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </UIProvider>
              </CartProvider>
            </FilterProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
