import React, { useState } from "react";
import Image from "next/image";

const ImageSize = ({ src, imageSize }) => {
  const [paddingBottom, setPaddingBottom] = useState("0");
  const imageSizes = {
    icon: "50px",
    small: "100px",
    medium: "200px",
    large: "400px",
  };

  return (
    <div style={{ maxWidth: imageSizes[imageSize], margin: "0 auto" }}>
      <div style={{ position: "relative", paddingBottom }}>
        <Image
          src={src}
          layout="fill"
          objectFit="contain"
          onLoad={({ target }) => {
            const { naturalWidth, naturalHeight } = target;
            setPaddingBottom(
              `calc(100% / (${naturalWidth} / ${naturalHeight})`
            );
          }}
        />
      </div>
    </div>
  );
};

export default ImageSize;
