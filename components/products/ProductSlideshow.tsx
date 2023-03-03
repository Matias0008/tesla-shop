import { useRef, useState, Fragment } from "react";
import { Slide, SlideshowRef } from "react-slideshow-image";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import styles from "./ProductSlideshow.module.css";
import Image from "next/legacy/image";
import { Grid } from "@mui/material";

interface Props {
  images: string[];
}

export const ProductSlideshow: React.FC<Props> = ({ images }) => {
  const slideRef = useRef<SlideshowRef>(null);
  const [activeImage, setActiveImage] = useState(0);

  const onSlideChange = (from: number, to: number) => {
    setActiveImage(to);
  };

  return (
    <>
      <Slide
        easing="ease"
        duration={7000}
        ref={slideRef}
        autoplay
        onChange={onSlideChange}
      >
        {images.map((image) => {
          return (
            <div className={styles["each-slide"]} key={image}>
              <div
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
          );
        })}
      </Slide>
      <Grid container mt={2}>
        {images.map((image, index) => {
          return (
            <Fragment key={`${image}${index}`}>
              <Grid item xs={3} sm={2}>
                <Box position="relative" height={"100%"} width={"100%"}>
                  <Image
                    src={image}
                    alt={image}
                    width={200}
                    height={200}
                    layout="responsive"
                    className={styles.imageBelowSlide}
                    onClick={(event) => slideRef.current?.goTo(index)}
                    style={{
                      opacity: activeImage === index ? 0.4 : "initial",
                    }}
                    priority
                  />
                </Box>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
};
