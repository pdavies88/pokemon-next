import React, { useState } from "react";
import Image from "next/image";

const ImageSize = ({ src }) => {
  const [paddingBottom, setPaddingBottom] = useState("0");

  return (
    <div style={{ maxWidth: "300px" }}>
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
