import Head from "next/head";

import { Box, Typography } from "@mui/material";

import { Footer, Navbar, Sidebar } from "../ui";

interface Props {
  children: React.ReactNode;
  title?: string;
  pageDescription: string;
  imageFullUrl?: string;
  usePadding?: boolean;
}

export const SlugLayout: React.FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
  usePadding = true,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <nav style={{ position: "sticky", top: 0, zIndex: 999 }}>
        <Navbar />
      </nav>
      <Sidebar />
      <Box
        component={"main"}
        sx={{
          padding: usePadding ? { xs: "28px", sm: "36px" } : "unset",
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};
